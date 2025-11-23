export default function makeApp(wsUrl: string): App;
declare class App {
    private readonly wsUrl;
    private readonly ws;
    private readonly result;
    private readonly errors;
    constructor(wsUrl: string);
    /** Auxiliary method to display search results */
    private displaySearchResults;
    /** Create scroll controls (prev/next) based on available links */
    private makeScrollControls;
    /** Auxiliary method to display book details */
    private displayBookDetails;
    /** Add a checkout form below the book details. */
    private addCheckoutForm;
    /** Update the #borrowers element by calling getLends and rendering results */
    private updateBorrowers;
    /** unwrap a result, displaying errors if !result.isOk,
     *  returning T otherwise.   Use as if (unwrap(result)) { ... }
     *  when T !== void.
     */
    private unwrap;
    /** clear out all errors */
    private clearErrors;
}
export {};
//# sourceMappingURL=app.d.ts.map