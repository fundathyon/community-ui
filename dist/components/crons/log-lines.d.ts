/**
 * Tone of an output line. stderr does NOT mean error: docker, git, npm and
 * most CLIs write normal progress to stderr, so the tone comes from the text:
 * an error word paints danger, a warning word paints warning, the rest stays.
 */
export type LogLineTone = "default" | "warning" | "danger";
export declare function logLineTone(text: string): LogLineTone;
