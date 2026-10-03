export interface EmailCodeProps {
    /** The code exactly as it should read. Pre-group it ("482 193") so it can be read aloud. */
    code: string;
    /** Expiry line under the box, e.g. "Expires in 10 minutes." */
    expiresText?: string;
}
/**
 * One-time code block for `OtpEmail`-style messages. Selectable text — never
 * an image — so it survives blocked images and copy/paste. Pair it with a
 * security note; auth emails must say what to do when the code wasn't requested.
 */
export declare function EmailCode({ code, expiresText }: EmailCodeProps): import("react").JSX.Element;
