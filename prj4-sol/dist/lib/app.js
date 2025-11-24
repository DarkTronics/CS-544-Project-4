import { makeLibraryWs } from './library-ws.js';
import { makeElement, makeQueryUrl, getFormData } from './utils.js';
export default function makeApp(wsUrl) {
    return new App(wsUrl);
}
class App {
    wsUrl;
    ws;
    result;
    errors;
    constructor(wsUrl) {
        this.wsUrl = wsUrl.replace(/\/$/, '');
        this.ws = makeLibraryWs(this.wsUrl);
        this.result = document.querySelector('#result');
        this.errors = document.querySelector('#errors');
        const search = document.querySelector('#search');
        if (search) {
            search.addEventListener('blur', (ev) => {
                const value = ev.target.value.trim();
                if (value.length < 2) {
                    this.displayErrors([
                        { message: "Search string must be at least 2 characters.", options: { code: "badsearch" } }
                    ]);
                    return;
                }
                const url = makeQueryUrl(`${this.wsUrl}/api/books`, { title: value });
                this.displaySearchResults(url);
            });
        }
    }
    /** Render search results */
    async displaySearchResults(url) {
        this.clearErrors();
        const urlStr = typeof url === "string" ? url : url.toString();
        const result = await this.ws.findBooksByUrl(urlStr);
        const data = this.unwrap(result);
        if (!data)
            return;
        this.result.innerHTML = "";
        const scrollTop = this.makeScrollControls(data.links);
        if (scrollTop)
            this.result.append(scrollTop);
        const ul = makeElement("ul");
        for (const book of data.result) {
            const li = makeElement("li");
            const title = makeElement("span", {}, book.result.title);
            const details = makeElement('a', { href: "#" }, "details...");
            details.addEventListener("click", ev => {
                ev.preventDefault();
                this.displayBookDetails(book.links.self.href);
            });
            li.append(title, " ", details);
            ul.append(li);
        }
        this.result.append(ul);
        const scrollBottom = this.makeScrollControls(data.links);
        if (scrollBottom)
            this.result.append(scrollBottom);
    }
    /** prev/next pagination */
    makeScrollControls(links) {
        const hasPrev = !!links.prev;
        const hasNext = !!links.next;
        if (!hasPrev && !hasNext)
            return null;
        const div = makeElement("div", { class: "scroll" });
        if (hasPrev) {
            const prev = makeElement("a", { href: links.prev.href, rel: "prev" }, "<<");
            prev.addEventListener("click", ev => {
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.prev.href);
            });
            div.append(prev);
        }
        if (hasPrev && hasNext)
            div.append(" ");
        if (hasNext) {
            const next = makeElement("a", { href: links.next.href, rel: "next" }, ">>");
            next.addEventListener("click", ev => {
                ev.preventDefault();
                this.displaySearchResults(this.wsUrl + links.next.href);
            });
            div.append(next);
        }
        return div;
    }
    /** Display full book details */
    async displayBookDetails(url) {
        this.clearErrors();
        const result = await this.ws.getBookByUrl(url);
        const data = this.unwrap(result);
        if (!data)
            return;
        const book = data.result;
        const dl = makeElement("dl");
        // Add fields
        const addItem = (label, value) => {
            dl.append(makeElement("dt", {}, label));
            dl.append(makeElement("dd", {}, value));
        };
        addItem("ISBN", book.isbn);
        addItem("Title", book.title);
        addItem("Authors", book.authors.join("; "));
        addItem("Number of Pages", String(book.pages));
        addItem("Publisher", book.publisher);
        addItem("Number of Copies", String(book.nCopies));
        dl.append(makeElement("dt", {}, "Borrowers"));
        dl.append(makeElement("dd", { id: "borrowers" }, "None"));
        this.result.innerHTML = "";
        this.result.append(dl);
        this.addCheckoutForm(book.isbn);
        this.updateBorrowers(book.isbn);
    }
    /** checkout form */
    addCheckoutForm(isbn) {
        const form = makeElement("form", { class: "grid-form" });
        const label = makeElement("label", { for: "patronId" }, "Patron ID");
        const input = makeElement("input", { id: "patronId", name: "patronId" });
        const errorSpan = makeElement("span", { class: "error", id: "patronId-error" });
        const wrap = makeElement("span");
        wrap.append(input, makeElement("br"), errorSpan);
        const button = makeElement("button", { type: "submit" }, "Checkout Book");
        form.append(label, wrap, button);
        form.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            this.clearErrors();
            const data = getFormData(form);
            const patronId = data.patronId;
            if (!patronId) {
                const w = document.querySelector("#patronId-error");
                w.append("Patron ID required");
                return;
            }
            const r = await this.ws.checkoutBook({ isbn, patronId });
            if (!r.isOk) {
                this.displayErrors(r.errors);
                return;
            }
            await this.updateBorrowers(isbn);
        });
        this.result.append(form);
    }
    /** borrowers list */
    async updateBorrowers(isbn) {
        const r = await this.ws.getLends(isbn);
        if (!r.isOk) {
            this.displayErrors(r.errors);
            return;
        }
        const lends = r.val;
        const dd = this.result.querySelector("#borrowers");
        if (!lends || lends.length === 0) {
            dd.innerHTML = "None";
            return;
        }
        const ul = makeElement("ul");
        for (const lend of lends) {
            const li = makeElement("li");
            const span = makeElement("span", { class: "content" }, lend.patronId);
            const btn = makeElement("button", { class: "return-book" }, "Return Book");
            btn.addEventListener("click", async (ev) => {
                ev.preventDefault();
                const r2 = await this.ws.returnBook(lend);
                if (!r2.isOk) {
                    this.displayErrors(r2.errors);
                    return;
                }
                await this.updateBorrowers(isbn);
            });
            li.append(span, btn);
            ul.append(li);
        }
        dd.innerHTML = "";
        dd.append(ul);
    }
    /** Safe unwrap() for all Result<T> */
    unwrap(result) {
        if (!result.isOk) {
            this.displayErrors(result.errors);
            return null;
        }
        return result.val;
    }
    /** Clear errors UI */
    clearErrors() {
        this.errors.innerHTML = "";
        document.querySelectorAll(".error").forEach(el => (el.innerHTML = ""));
    }
    /** Display error list correctly typed */
    displayErrors(errors) {
        for (const err of errors) {
            const id = err.options.widget ?? err.options.path;
            const widget = id && document.querySelector(`#${id}-error`);
            if (widget) {
                widget.append(err.message);
            }
            else {
                const li = makeElement("li", { class: "error" }, err.message);
                this.errors.append(li);
            }
        }
    }
}
//# sourceMappingURL=app.js.map