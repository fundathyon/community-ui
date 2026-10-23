/**
 * Tone of an output line. stderr does NOT mean error: docker, git, npm and
 * most CLIs write normal progress to stderr, so the tone comes from the text:
 * an error word paints danger, a warning word paints warning, the rest stays.
 */
export type LogLineTone = "default" | "warning" | "danger";

// Optional CLI prefix before the level: "[12:00:01] ", "#7 ", "npm ".
const PREFIX = String.raw`^\s*(?:\[[^\]]*\]\s*|#\d+\s+|npm\s+)?`;
const ERROR_START = new RegExp(PREFIX + String.raw`(?:error|fatal|panic|err!)(?=[\s:!\]]|$)`, "i");
const ERROR_WORD = /\b(?:ERROR|FATAL)\b|\bfailed to\b/;
const WARN_START = new RegExp(PREFIX + String.raw`warn(?:ing)?(?=[\s:!\]]|$)`, "i");
const WARN_WORD = /\bWARN(?:ING)?\b/;

export function logLineTone(text: string): LogLineTone {
  if (ERROR_START.test(text) || ERROR_WORD.test(text)) return "danger";
  if (WARN_START.test(text) || WARN_WORD.test(text)) return "warning";
  return "default";
}
