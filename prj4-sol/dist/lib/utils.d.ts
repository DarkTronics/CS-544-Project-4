/** Return a new DOM element with specified tagName, attributes given
 *  by object attrs and internal elements appendees which can be text
 *  or HTML elements.  Note that .append(TextOrElement...) can be
 *  called on the returned element to append further string text or a
 *  DOM elements to it while setAttribute() can be used for setting
 *  its attributes.
 */
export declare function makeElement(tagName: string, attrs?: {
    [attr: string]: string;
}, ...appendees: (string | HTMLElement)[]): HTMLElement;
/** Given a baseUrl and req, return a URL object which contains
 *  req as query-parameters appended to baseUrl.
 */
export declare function makeQueryUrl(baseUrl: string, req: Record<string, string>): URL;
/** Return a key-value mapping for all non-empty data from form */
export declare function getFormData(form: HTMLFormElement): Record<string, string>;
//# sourceMappingURL=utils.d.ts.map