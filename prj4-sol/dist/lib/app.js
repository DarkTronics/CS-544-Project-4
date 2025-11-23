import { makeLibraryWs } from './library-ws.js';
import { makeElement, makeQueryUrl } from './utils.js';
export default function makeApp(wsUrl) {
    return new App(wsUrl);
}
class App {
    wsUrl;
    ws;
    result;
    errors;
    constructor(wsUrl) {
        this.wsUrl = wsUrl;
        this.ws = makeLibraryWs(wsUrl);
        this.result = document.querySelector('#result');
        this.errors = document.querySelector('#errors');
        //TODO: add search handler
        const search = document.querySelector('#search');
        if (search) {
            search.addEventListener('blur', (ev) => {
                const value = ev.target.value;
                const url = makeQueryUrl(`${this.wsUrl}/api/books`, { search: value });
                console.log('#search blurred', value, url);
                // Call the auxiliary method with the generated URL
                this.displaySearchResults(url);
            });
        }
    }
    //TODO: add private methods as needed
    /** Auxiliary method to display search results */
    async displaySearchResults(url) {
        this.clearErrors();
        // Convert URL object to string if necessary
        const urlString = typeof url === 'string' ? url : url.toString();
        // Call the web service
        const result = await this.ws.findBooksByUrl(urlString);
        // Log the result to console to verify structure
        console.log('Search result:', result);
        // Unwrap the result to check for errors
        const data = this.unwrap(result);
        if (data) {
            console.log('Unwrapped data:', data);
            // Clear previous results
            this.result.innerHTML = '';
            // Add scroll controls before results
            const scrollBefore = this.makeScrollControls(data.links);
            if (scrollBefore) {
                this.result.append(scrollBefore);
            }
            // Display the books as an unordered list
            const books = data.result;
            const ul = makeElement('ul');
            for (const book of books) {
                const li = makeElement('li');
                const title = makeElement('span', {}, book.result.title);
                const details = makeElement('a', { href: '#' }, 'details...');
                // Add click handler for details link
                const selfLink = book.links.self.href;
                details.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    this.displayBookDetails(selfLink);
                });
                li.append(title, ' ', details);
                ul.append(li);
            }
            this.result.append(ul);
            // Add scroll controls after results
            const scrollAfter = this.makeScrollControls(data.links);
            if (scrollAfter) {
                this.result.append(scrollAfter);
            }
        }
    }
    /** Create scroll controls (prev/next) based on available links */
    makeScrollControls(links) {
        const hasPrev = links.prev !== undefined;
        const hasNext = links.next !== undefined;
        if (!hasPrev && !hasNext) {
            return null;
        }
        const scrollDiv = makeElement('div', { class: 'scroll' });
        if (hasPrev) {
            const prevLink = makeElement('a', { href: links.prev.href, rel: 'prev' }, '<<');
            prevLink.addEventListener('click', (ev) => {
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.prev.href);
            });
            scrollDiv.append(prevLink);
        }
        if (hasPrev && hasNext) {
            scrollDiv.append(' ');
        }
        if (hasNext) {
            const nextLink = makeElement('a', { href: links.next.href, rel: 'next' }, '>>');
            nextLink.addEventListener('click', (ev) => {
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.next.href);
            });
            scrollDiv.append(nextLink);
        }
        return scrollDiv;
    }
    /** Auxiliary method to display book details */
    async displayBookDetails(url) {
        this.clearErrors();
        console.log('Details URL:', url);
        // Call the web service
        const result = await this.ws.getBookByUrl(this.wsUrl + url);
        // Log the result to console
        console.log('Book details result:', result);
        // Unwrap the result
        const data = this.unwrap(result);
        if (data) {
            const book = data.result;
            // Create definition list for book details
            const dl = makeElement('dl');
            // ISBN
            dl.append(makeElement('dt', {}, 'ISBN'));
            dl.append(makeElement('dd', {}, book.isbn));
            // Title
            dl.append(makeElement('dt', {}, 'Title'));
            dl.append(makeElement('dd', {}, book.title));
            // Authors
            dl.append(makeElement('dt', {}, 'Authors'));
            dl.append(makeElement('dd', {}, book.authors.join('; ')));
            // Number of Pages
            dl.append(makeElement('dt', {}, 'Number of Pages'));
            dl.append(makeElement('dd', {}, String(book.pages)));
            // Publisher
            dl.append(makeElement('dt', {}, 'Publisher'));
            dl.append(makeElement('dd', {}, book.publisher));
            // Number of Copies
            dl.append(makeElement('dt', {}, 'Number of Copies'));
            dl.append(makeElement('dd', {}, String(book.nCopies)));
            // Borrowers (with id for later use)
            dl.append(makeElement('dt', { id: 'borrowers' }, 'Borrowers'));
            dl.append(makeElement('dd', {}, 'None'));
            // Display in result area
            this.result.innerHTML = '';
            this.result.append(dl);
        }
    }
    /** unwrap a result, displaying errors if !result.isOk,
     *  returning T otherwise.   Use as if (unwrap(result)) { ... }
     *  when T !== void.
     */
    unwrap(result) {
        if (result.isOk === false) {
            displayErrors(result.errors);
        }
        else {
            return result.val;
        }
    }
    /** clear out all errors */
    clearErrors() {
        this.errors.innerHTML = '';
        document.querySelectorAll(`.error`).forEach(el => {
            el.innerHTML = '';
        });
    }
} //class App
/** Display errors. If an error has a widget or path widgetId such
 *  that an element having ID `${widgetId}-error` exists,
 *  then the error message is added to that element; otherwise the
 *  error message is added to the element having to the element having
 *  ID `errors` wrapped within an `<li>`.
 */
function displayErrors(errors) {
    for (const err of errors) {
        const id = err.options.widget ?? err.options.path;
        const widget = id && document.querySelector(`#${id}-error`);
        if (widget) {
            widget.append(err.message);
        }
        else {
            const li = makeElement('li', { class: 'error' }, err.message);
            document.querySelector(`#errors`).append(li);
        }
    }
}
//TODO: add functions as needed
//# sourceMappingURL=app.js.map