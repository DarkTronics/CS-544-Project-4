import { Errors } from 'cs544-js-utils';
import { z } from 'zod';
/** Convert a zodResult to an Errors.Result.  Use issuesInfos[zodMsg]
 *  as the translation of zodMsg.  All missing field errors will
 *  get code `MISSING` and all bad type errors will get code `BAD_TYPE`.
 */
export function zodToResult(zod, issueInfos = {}) {
    if (zod.success === true) {
        return Errors.okResult(zod.data);
    }
    else {
        return zodErrorToResultError(zod.error, issueInfos);
    }
}
function zodErrorToResultError(zodError, issueInfos) {
    const errors = [];
    for (const zIssue of zodError.issues) {
        let err;
        const msg = zIssue.message;
        let issueInfo = issueInfos[msg];
        if (typeof issueInfo === 'function') {
            issueInfo = issueInfo(zIssue);
        }
        const message = (typeof issueInfo === 'object')
            ? issueInfo.message
            : (typeof issueInfo === 'string')
                ? issueInfo
                : issueMessage(zIssue);
        const options = (typeof issueInfo === 'object')
            ? issueOptions(zIssue, issueInfo.options)
            : issueOptions(zIssue);
        err = new Errors.Err(message, options);
        errors.push(err);
    }
    return new Errors.ErrResult(errors);
}
function issueMessage(zIssue) {
    let message = zIssue.message;
    const path = zIssue.path ?? [];
    const widget = (path.at(-1) ?? '').toString();
    if (zIssue.code === z.ZodIssueCode.invalid_type) {
        if (zIssue.received === 'undefined') {
            message = `${widget} is required`.trim();
        }
        else {
            message = `${widget} must have type ${zIssue.expected}`.trim();
        }
    }
    return message;
}
function issueOptions(zIssue, options = {}) {
    const path = zIssue.path ?? [];
    const widget = (path.at(-1) ?? '').toString();
    let code = 'BAD_REQ';
    if (zIssue.code === z.ZodIssueCode.invalid_type) {
        if (zIssue.received === 'undefined') {
            code = 'MISSING';
        }
        else {
            code = 'BAD_TYPE';
        }
    }
    return { code, ...options, path: path.join('|'), };
}
//# sourceMappingURL=zod-utils.js.map