import { Errors } from 'cs544-js-utils';

import { SuccessEnvelope, PagedEnvelope, ErrorEnvelope }
  from './response-envelopes.js';
import * as Lib from 'library-types';

import * as Utils from './utils.js';

type NonPagedResult<T> = SuccessEnvelope<T> | ErrorEnvelope;

export function makeLibraryWs(url: string) {
  return new LibraryWs(url);
}

export class LibraryWs {
  // base url for these web services (no trailing slash)
  private url: string;

  constructor(url: string) {
    // normalize base url (remove trailing slash if present)
    this.url = url.replace(/\/$/, '');
  }

  /** Normalize a possibly-relative link to an absolute URL string.
   *  If the provided link is already absolute (starts with http(s):),
   *  return as-is. If it starts with '/', prefix with this.url.
   *  Accepts either string or URL.
   */
  private normalizeLink(link: string | URL): string {
    const s = typeof link === 'string' ? link : link.toString();
    // absolute?
    if (/^https?:\/\//i.test(s)) return s;
    // relative starting with '/'
    if (s.startsWith('/')) return `${this.url}${s}`;
    // relative without slash — treat as relative to base path
    return `${this.url}/${s}`;
  }

  /** given an absolute books url bookUrl ending with /books/api,
   *  return a SuccessEnvelope for the book identified by bookUrl.
   */
  async getBookByUrl(bookUrl: URL | string)
    : Promise<Errors.Result<SuccessEnvelope<Lib.XBook>>> {
    const u = this.normalizeLink(bookUrl);
    return getEnvelope<Lib.XBook, SuccessEnvelope<Lib.XBook>>(u);
  }

  /** given an absolute url findUrl ending with /books with query
   *  parameters search and optional query parameters count and index,
   *  return a PagedEnvelope containing a list of matching books.
   */
  async findBooksByUrl(findUrl: URL | string)
    : Promise<Errors.Result<PagedEnvelope<Lib.XBook>>> {
    const u = this.normalizeLink(findUrl);
    return getEnvelope<Lib.XBook, PagedEnvelope<Lib.XBook>>(u);
  }

  /** check out book specified by lend (PUT /api/lendings) */
  async checkoutBook(lend: Lib.Lend): Promise<Errors.Result<void>> {
    const url = `${this.url}/api/lendings`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lend),
      });

      // try to parse JSON; if parse fails we'll catch below
      const envelope = await response.json() as NonPagedResult<void>;
      if (envelope && (envelope as any).isOk === true) {
        return Errors.VOID_RESULT;
      }
      else {
        // envelope is ErrorEnvelope
        return new Errors.ErrResult((envelope as ErrorEnvelope).errors as Errors.Err[]);
      }
    }
    catch (err) {
      console.error(err);
      return Errors.errResult(`PUT ${url}: error ${err}`);
    }
  }

  /** return book specified by lend (DELETE /api/lendings) */
  async returnBook(lend: Lib.Lend): Promise<Errors.Result<void>> {
    const url = `${this.url}/api/lendings`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lend),
      });

      const envelope = await response.json() as NonPagedResult<void>;
      if (envelope && (envelope as any).isOk === true) {
        return Errors.VOID_RESULT;
      }
      else {
        return new Errors.ErrResult((envelope as ErrorEnvelope).errors as Errors.Err[]);
      }
    }
    catch (err) {
      console.error(err);
      return Errors.errResult(`DELETE ${url}: error ${err}`);
    }
  }

  /** return Lend[] of all lendings for isbn.
   *  GET /api/lendings?findBy=isbn&isbn=...
   */
  async getLends(isbn: string): Promise<Errors.Result<Lib.Lend[]>> {
    const url = new URL(`${this.url}/api/lendings`);
    url.searchParams.set('findBy', 'isbn');
    url.searchParams.set('isbn', isbn);

    try {
      const res = await fetchJson<NonPagedResult<Lib.Lend[]>>(url.toString());
      if (res.isOk === false) {
        // network/fetch/json error converted to ErrResult already
        return res as Errors.Result<Lib.Lend[]>;
      }
      const envelope = res.val as NonPagedResult<Lib.Lend[]>;
      if (envelope && (envelope as any).isOk === true) {
        // SuccessEnvelope.result is the value
        const success = envelope as SuccessEnvelope<Lib.Lend[]>;
        return Errors.okResult(success.result as Lib.Lend[]);
      }
      else {
        // ErrorEnvelope
        return new Errors.ErrResult((envelope as ErrorEnvelope).errors as Errors.Err[]);
      }
    }
    catch (err) {
      console.error(err);
      return Errors.errResult(`GET ${url.toString()}: error ${err}`);
    }
  }

}

/** Return either a SuccessEnvelope<T> or PagedEnvelope<T> wrapped
 *  within an Errors.Result.  Note that the caller needs to instantiate
 *  the type parameters appropriately.
 */
async function getEnvelope<T, T1 extends SuccessEnvelope<T> | PagedEnvelope<T>>
  (url: URL | string)
  : Promise<Errors.Result<T1>> {
  const u = typeof url === 'string' ? url : url.toString();
  const result = await fetchJson<T1 | ErrorEnvelope>(u);
  if (result.isOk === true) {
    const response = result.val;
    if (response && (response as any).isOk === true) {
      return Errors.okResult(response as T1);
    }
    else {
      return new Errors.ErrResult((response as ErrorEnvelope).errors as Errors.Err[]);
    }
  }
  else {
    return result as Errors.Result<T1>;
  }
}

const DEFAULT_FETCH: RequestInit = { method: 'GET' };

/** send a request to url, converting any exceptions to an
 *  Errors.Result. If fetch succeeds but response.json() fails,
 *  this is converted to an errResult as well.
 */
async function fetchJson<T>(url: URL | string, options: RequestInit = DEFAULT_FETCH)
  : Promise<Errors.Result<T>> {
  const u = typeof url === 'string' ? url : url.toString();
  try {
    const response = await fetch(u, options);
    // Attempt to parse JSON body. If response has no JSON body this may throw.
    const body = await response.json() as T;
    return Errors.okResult(body);
  }
  catch (err) {
    console.error(err);
    return Errors.errResult(`${options.method ?? 'GET'} ${u}: error ${err}`);
  }
}
