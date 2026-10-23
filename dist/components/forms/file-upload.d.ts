import { type ReactNode } from "react";
import type { Size } from "../../lib/types";
export type FileUploadStatus = "queued" | "uploading" | "done" | "error";
export interface FileUploadValue {
    /** The selected file. */
    file: File;
    /**
     * Local per-file lifecycle, driven by whoever performs the actual upload —
     * FileUpload never calls the network itself. Deliberately NOT one of the
     * §19 sixteen resource states: that taxonomy models platform resources
     * (tokens, repos, users…), this models one in-flight file transfer, a
     * smaller, local, transient concept that doesn't belong in the suite-wide
     * vocabulary.
     */
    status: FileUploadStatus;
    /** 0-100. Meaningful while `status` is `"uploading"`. */
    progress?: number;
    /** Message shown under the filename while `status` is `"error"`. */
    error?: string;
    /**
     * Whether the Retry button shows for an `"error"` item — the task's "retry
     * OR remove" (§10), not always both. Defaults to `true`. FileUpload's own
     * accept/size rejections set this to `false`: nothing about the file
     * changes by re-queuing it, so retrying would just fail the same way again
     * (or waste a request the server would reject too). Set it to `false`
     * yourself for a non-retryable upload failure too (e.g. a 4xx you know
     * won't succeed on a second attempt).
     */
    retryable?: boolean;
}
export interface FileUploadProps {
    /**
     * Native `accept` attribute mirror — extensions and/or MIME types, e.g.
     * `".yaml,.json,.env"`. Filters the OS picker; re-checked on drop since
     * drag-and-drop bypasses the picker's own filtering.
     */
    accept?: string;
    /** Max size in bytes. An oversized file never leaves the browser — it
     * becomes a local `"error"` item instead of a network call. */
    maxSize?: number;
    /** Controlled value. `null` renders the empty dropzone. */
    value?: FileUploadValue | null;
    defaultValue?: FileUploadValue | null;
    onValueChange?: (value: FileUploadValue | null) => void;
    /** Call to action inside the empty dropzone. Pass your product copy —
     * defaults to English. */
    prompt?: ReactNode;
    /** Secondary line under the prompt — name the accepted formats/size here
     * (e.g. "YAML, JSON or .env, up to 2 MB"). Defaults to a size-only note
     * derived from `maxSize`, or nothing. */
    hint?: ReactNode;
    /** Accessible-name factory for the remove/retry buttons. Pass your product
     * copy — defaults to English. */
    actionLabel?: (action: "remove" | "retry", fileName: string) => string;
    /** Dropzone padding / file-row height. Defaults to the density's size. */
    size?: Size;
    disabled?: boolean;
    /** Marks invalid when used standalone. Inside a FormField the field state
     * drives this automatically. */
    invalid?: boolean;
    required?: boolean;
    /** Field name for form submission. */
    name?: string;
    /** Accessible name for standalone use — inside a FormField the label wires
     * itself to the hidden input. */
    "aria-label"?: string;
    className?: string;
}
/**
 * FileUpload — a compact, single-file dropzone (§10): drag-and-drop or
 * click-to-browse via a real, accessibly-hidden `<input type="file">` (the
 * only reliable cross-browser way to open the OS picker — never a custom
 * one). It tracks ONE file through `queued → uploading → done` (or
 * `error`) and is entirely caller-driven: FileUpload never performs the
 * upload itself, `value.status`/`value.progress` are pushed in by whoever
 * owns the network request. Retrying is just re-queuing: set
 * `status: "queued"` again on the same file and your `onValueChange` effect
 * (the same one that starts the upload for a fresh selection) fires again.
 *
 * Single file only, by design: the spec's only visual reference shows one
 * file, and a real multi-file queue (reordering, aggregate error summaries,
 * independent per-row everything) is a meaningfully bigger component than
 * this control's 8-prop budget affords. Browse and drop both always take
 * just the first file.
 *
 * Lives inside a FormField like every other control (§C-04) — it owns its
 * own per-file row (filename, size/progress/error, remove/retry), never the
 * field-level label or error.
 */
export declare const FileUpload: import("react").ForwardRefExoticComponent<FileUploadProps & import("react").RefAttributes<HTMLInputElement>>;
