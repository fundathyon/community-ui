export interface UseCopyToClipboardOptions {
    /** How long `copied` stays true, in ms. */
    resetAfter?: number;
}
/**
 * Copy text to the clipboard with a transient `copied` flag for UI feedback.
 * Always copy the FULL value — never a middle-truncated display form (§20).
 */
export declare function useCopyToClipboard({ resetAfter }?: UseCopyToClipboardOptions): {
    readonly copied: boolean;
    readonly copy: (text: string) => Promise<boolean>;
};
