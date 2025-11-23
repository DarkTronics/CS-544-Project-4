import { Errors } from 'cs544-js-utils';
import { SuccessEnvelope, PagedEnvelope } from './response-envelopes.js';
import * as Lib from 'library-types';
export declare function makeLibraryWs(url: string): LibraryWs;
export declare class LibraryWs {
    private url;
    constructor(url: string);
    /** given an absolute books url bookUrl ending with /books/api,
     *  return a SuccessEnvelope for the book identified by bookUrl.
     */
    getBookByUrl(bookUrl: URL | string): Promise<Errors.Result<SuccessEnvelope<Lib.XBook>>>;
    /** given an absolute url findUrl ending with /books with query
     *  parameters search and optional query parameters count and index,
     *  return a PagedEnvelope containing a list of matching books.
     */
    findBooksByUrl(findUrl: URL | string): Promise<Errors.Result<PagedEnvelope<Lib.XBook>>>;
    /** check out book specified by lend */
    checkoutBook(lend: Lib.Lend): Promise<Errors.Result<void>>;
    /** return book specified by lend */
    returnBook(lend: Lib.Lend): Promise<Errors.Result<void>>;
    /** return Lend[] of all lendings for isbn. */
    getLends(isbn: string): Promise<Errors.Result<Lib.Lend[]>>;
}
//# sourceMappingURL=library-ws.d.ts.map