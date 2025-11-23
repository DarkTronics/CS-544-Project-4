import { Errors } from 'cs544-js-utils';
export function makeLibraryWs(url) {
    return new LibraryWs(url);
}
export class LibraryWs {
    //base url for these web services
    url;
    constructor(url) { this.url = url; }
    /** given an absolute books url bookUrl ending with /books/api,
     *  return a SuccessEnvelope for the book identified by bookUrl.
     */
    async getBookByUrl(bookUrl) {
        return getEnvelope(bookUrl);
    }
    /** given an absolute url findUrl ending with /books with query
     *  parameters search and optional query parameters count and index,
     *  return a PagedEnvelope containing a list of matching books.
     */
    async findBooksByUrl(findUrl) {
        return getEnvelope(findUrl);
    }
    /** check out book specified by lend */
    //make a PUT request to /lendings
    async checkoutBook(lend) {
        const url = `${this.url}/api/lendings`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lend),
            });
            const envelope = await response.json();
            if (envelope.isOk === true) {
                return Errors.VOID_RESULT;
            }
            else {
                return new Errors.ErrResult(envelope.errors);
            }
        }
        catch (err) {
            console.error(err);
            return Errors.errResult(`PUT ${url}: error ${err}`);
        }
    }
    /** return book specified by lend */
    //make a DELETE request to /lendings
    async returnBook(lend) {
        const url = `${this.url}/api/lendings`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lend),
            });
            const envelope = await response.json();
            if (envelope.isOk === true) {
                return Errors.VOID_RESULT;
            }
            else {
                return new Errors.ErrResult(envelope.errors);
            }
        }
        catch (err) {
            console.error(err);
            return Errors.errResult(`DELETE ${url}: error ${err}`);
        }
    }
    /** return Lend[] of all lendings for isbn. */
    //make a GET request to /lendings with query-params set
    //to { findBy: 'isbn', isbn }.
    async getLends(isbn) {
        const url = new URL(`${this.url}/api/lendings`);
        url.searchParams.set('findBy', 'isbn');
        url.searchParams.set('isbn', isbn);
        try {
            const result = await fetchJson(url.toString());
            if (result.isOk === false) {
                return result;
            }
            const envelope = result.val;
            if (envelope.isOk === true) {
                return Errors.okResult(envelope.result);
            }
            else {
                return new Errors.ErrResult(envelope.errors);
            }
        }
        catch (err) {
            console.error(err);
            return Errors.errResult(`GET ${url.toString()}: error ${err}`);
        }
    }
}
/** Return either a SuccessEnvelope<T> or PagedEnvelope<T> wrapped
 *  within a Errors.Result.  Note that the caller needs to instantiate
 *  both type parameters appropriately.
 */
async function getEnvelope(url) {
    const result = await fetchJson(url);
    if (result.isOk === true) {
        const response = result.val;
        if (response.isOk === true) {
            return Errors.okResult(response);
        }
        else
            return new Errors.ErrResult(response.errors);
    }
    else {
        return result;
    }
}
const DEFAULT_FETCH = { method: 'GET', };
/** send a request to url, converting any exceptions to an
 *  error result.
 */
async function fetchJson(url, options = DEFAULT_FETCH) {
    //<https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts#L26104>
    try {
        const response = await fetch(url, options);
        return Errors.okResult(await response.json());
    }
    catch (err) {
        console.error(err);
        return Errors.errResult(`${options.method} ${url}: error ${err}`);
    }
}
//TODO: add other functions as needed
//# sourceMappingURL=library-ws.js.map