/** Return a new DOM element with specified tagName, attributes given
 *  by object attrs and internal elements appendees which can be text
 *  or HTML elements.  Note that .append(TextOrElement...) can be
 *  called on the returned element to append further string text or a
 *  DOM elements to it while setAttribute() can be used for setting
 *  its attributes.
 */
export function makeElement(tagName, attrs = {}, ...appendees) {
    const element = document.createElement(tagName);
    for (const [k, v] of Object.entries(attrs)) {
        element.setAttribute(k, v);
    }
    element.append(...appendees);
    return element;
}
/** Given a baseUrl and req, return a URL object which contains
 *  req as query-parameters appended to baseUrl.
 */
export function makeQueryUrl(baseUrl, req) {
    const url = new URL(baseUrl);
    Object.entries(req).forEach(([k, v]) => url.searchParams.append(k, v));
    return url;
}
/** Return a key-value mapping for all non-empty data from form */
export function getFormData(form) {
    const pairs = [...new FormData(form).entries()]
        .map(([k, v]) => [k, v])
        .filter(([_, v]) => v.trim().length > 0);
    return Object.fromEntries(pairs);
}
//# sourceMappingURL=utils.js.map