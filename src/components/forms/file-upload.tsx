"use client";

import { Field } from "@base-ui/react/field";
import { Check, CircleAlert, File as FileIcon, RefreshCw, Upload, X } from "lucide-react";
import { forwardRef, useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { formatBytes } from "../../lib/format";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { IconButton } from "../actions/icon-button";
import { Progress } from "../feedback/progress";
import { Icon } from "../typography/icon";

const dropzoneSizeClasses: Record<Size, string> = {
  xs: "gap-1 p-3",
  sm: "gap-1 p-3",
  md: "gap-1.5 p-4",
  lg: "gap-1.5 p-5",
};

const fileRowSizeClasses: Record<Size, string> = {
  xs: "min-h-control-xs gap-1.5 px-2 py-1",
  sm: "min-h-control-sm gap-2 px-2.5 py-1",
  md: "min-h-control-md gap-2 px-2.5 py-1.5",
  lg: "min-h-control-lg gap-2.5 px-3 py-2",
};

/** Loose `accept` matcher covering extensions (`.yaml`), exact MIME types
 * (`application/json`) and wildcards (`image/*`) — the same three forms the
 * native `accept` attribute itself understands. Only used for drops: the OS
 * picker already filters `browse` selections, but drag-and-drop bypasses it. */
function isAccepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  if (rules.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

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
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    accept,
    maxSize,
    value: valueProp,
    defaultValue,
    onValueChange,
    prompt = "Drag a file or browse",
    hint,
    actionLabel = (action, fileName) => (action === "retry" ? `Retry ${fileName}` : `Remove ${fileName}`),
    size,
    disabled,
    invalid,
    required,
    name,
    "aria-label": ariaLabel,
    className,
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  const [value, setValue] = useControllableState<FileUploadValue | null>({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragCounter = useRef(0);
  const [dragActive, setDragActive] = useState(false);

  const setRefs = (node: HTMLElement | null) => {
    const inputNode = node as HTMLInputElement | null;
    inputRef.current = inputNode;
    if (typeof ref === "function") ref(inputNode);
    else if (ref) ref.current = inputNode;
  };

  const resolvedHint = hint ?? (maxSize ? `Up to ${formatBytes(maxSize)}` : undefined);

  const acceptFile = (file: File) => {
    if (disabled) return;
    if (!isAccepted(file, accept)) {
      setValue({ file, status: "error", error: "Unsupported file type", retryable: false });
      return;
    }
    if (maxSize && file.size > maxSize) {
      setValue({ file, status: "error", error: `Exceeds the ${formatBytes(maxSize)} limit`, retryable: false });
      return;
    }
    setValue({ file, status: "queued" });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) acceptFile(file);
  };

  const handleRemove = () => {
    setValue(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRetry = () => {
    if (value) setValue({ file: value.file, status: "queued" });
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current += 1;
    setDragActive(true);
  };
  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setDragActive(false);
  };
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragCounter.current = 0;
    setDragActive(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file) acceptFile(file);
  };

  return (
    <div
      className={cn(
        "relative min-w-0 rounded-md",
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        className,
      )}
    >
      {!value ? (
        <div
          data-drag-active={dragActive || undefined}
          data-invalid={invalid || undefined}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center justify-center rounded-md border border-dashed border-border-strong text-center",
            "transition-colors duration-[var(--fdn-dur-fast)]",
            "data-[drag-active]:border-accent-border data-[drag-active]:bg-accent-bg",
            "data-[invalid]:border-danger-border",
            disabled && "cursor-not-allowed opacity-45",
            dropzoneSizeClasses[resolvedSize],
          )}
        >
          <Icon icon={Upload} size={20} className="text-text-muted" />
          <p className="text-label text-text">{prompt}</p>
          {resolvedHint && <p className="text-caption text-text-muted">{resolvedHint}</p>}
        </div>
      ) : (
        <div
          aria-busy={value.status === "uploading" || undefined}
          data-invalid={invalid || undefined}
          className={cn(
            "flex min-w-0 items-center rounded-md border bg-surface text-text",
            "transition-colors duration-[var(--fdn-dur-fast)]",
            value.status === "error" || invalid ? "border-danger-border" : "border-border-strong",
            disabled && "opacity-45",
            fileRowSizeClasses[resolvedSize],
          )}
        >
          <Icon icon={FileIcon} size={16} className="shrink-0 text-text-muted" />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
            <span className="flex items-center gap-1.5">
              <span className="truncate text-label text-text">{value.file.name}</span>
              {value.status === "done" && <Icon icon={Check} size={14} className="shrink-0 text-success" />}
            </span>
            {value.status === "uploading" ? (
              <Progress value={value.progress ?? 0} />
            ) : value.status === "error" ? (
              <span role="alert" className="flex items-center gap-1 text-caption text-danger">
                <Icon icon={CircleAlert} size={12} className="shrink-0" />
                <span className="truncate">{value.error}</span>
              </span>
            ) : (
              <span className="text-caption text-text-muted">{formatBytes(value.file.size)}</span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {value.status === "error" && value.retryable !== false && (
              <IconButton
                icon={RefreshCw}
                label={actionLabel("retry", value.file.name)}
                size={resolvedSize}
                variant="ghost"
                disabled={disabled}
                onClick={handleRetry}
              />
            )}
            <IconButton
              icon={X}
              label={actionLabel("remove", value.file.name)}
              size={resolvedSize}
              variant="ghost"
              disabled={disabled}
              onClick={handleRemove}
            />
          </div>
        </div>
      )}
      <Field.Control
        ref={setRefs}
        type="file"
        accept={accept}
        disabled={disabled}
        required={required}
        name={name}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
        tabIndex={value ? -1 : undefined}
        onChange={handleInputChange}
        className={cn(
          "outline-none",
          !value ? "absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed" : "sr-only",
        )}
      />
    </div>
  );
});
