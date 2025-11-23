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
            });
        }
    }
    //TODO: add private methods as needed
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