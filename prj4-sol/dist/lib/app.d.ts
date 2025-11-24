export default function makeApp(wsUrl: string): App;
declare class App {
    private readonly wsUrl;
    private readonly ws;
    private readonly result;
    private readonly errors;
    constructor(wsUrl: string);
    /** Render search results */
    private displaySearchResults;
    /** prev/next pagination */
    private makeScrollControls;
    /** Display full book details */
    private displayBookDetails;
    /** checkout form */
    private addCheckoutForm;
    /** borrowers list */
    private updateBorrowers;
    /** Safe unwrap() for all Result<T> */
    private unwrap;
    /** Clear errors UI */
    private clearErrors;
    /** Display error list correctly typed */
    private displayErrors;
}
export {};
//# sourceMappingURL=app.d.ts.map