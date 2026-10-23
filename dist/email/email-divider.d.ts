export interface EmailDividerProps {
    /** Vertical breathing room above/below the line, in px. Default 8. */
    spacing?: number;
}
/**
 * Separates blocks of one email when whitespace alone is not enough (e.g.
 * before request metadata). Use sparingly — most emails need zero or one.
 */
export declare function EmailDivider({ spacing }: EmailDividerProps): import("react").JSX.Element;
