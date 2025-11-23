import { Errors } from 'cs544-js-utils';
import { z } from 'zod';
type ZodResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: z.ZodError;
};
type Message = string;
type ErrInfo = {
    message: Message;
    options?: Record<string, string>;
};
type IssueFn = (issue: z.ZodIssue) => Message | ErrInfo;
type IssueInfos = Record<string, Message | ErrInfo | IssueFn>;
/** Convert a zodResult to an Errors.Result.  Use issuesInfos[zodMsg]
 *  as the translation of zodMsg.  All missing field errors will
 *  get code `MISSING` and all bad type errors will get code `BAD_TYPE`.
 */
export declare function zodToResult<T>(zod: ZodResult<T>, issueInfos?: IssueInfos): Errors.Result<T>;
export {};
//# sourceMappingURL=zod-utils.d.ts.map