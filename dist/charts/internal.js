import { formatDate, formatNumber } from "../lib/format";
/**
 * Pure data helpers shared by the cartesian charts. No recharts, no JSX — just
 * the reshaping every line/area/bar wrapper needs, kept in one place.
 */
/** Internal row key holding the (stringified) x value for the category axis. */
export const X_KEY = "__x";
/** A stable string identity for an x value (Date → its epoch ms). */
function xKeyOf(x) {
    if (x instanceof Date)
        return String(x.getTime());
    return String(x);
}
/** A numeric ordering for an x value, or null when it is a bare string. */
function sortableOf(x) {
    if (x instanceof Date)
        return x.getTime();
    if (typeof x === "number")
        return x;
    return null;
}
/**
 * Merge N series (each its own x/y list) into recharts' row-per-x shape, keyed
 * by series name, sorted by x when x is numeric/temporal (category order is
 * preserved for string x). Gaps (`y === null`) are kept so lines can break.
 */
export function buildCartesianData(series) {
    const rowByKey = new Map();
    const originals = new Map();
    const keys = [];
    for (const s of series) {
        for (const p of s.data) {
            const key = xKeyOf(p.x);
            let row = rowByKey.get(key);
            if (!row) {
                row = { [X_KEY]: key };
                rowByKey.set(key, row);
                originals.set(key, p.x);
                keys.push(key);
            }
            row[s.name] = p.y;
        }
    }
    const allSortable = keys.every((k) => sortableOf(originals.get(k)) !== null);
    if (allSortable) {
        keys.sort((a, b) => (sortableOf(originals.get(a)) ?? 0) - (sortableOf(originals.get(b)) ?? 0));
    }
    return { rows: keys.map((k) => rowByKey.get(k)), originals };
}
/** Count gap samples (`y === null`) and total samples across all series (§22). */
export function countGaps(series) {
    let missing = 0;
    let total = 0;
    for (const s of series) {
        for (const p of s.data) {
            total += 1;
            if (p.y === null)
                missing += 1;
        }
    }
    return { missing, total };
}
/** True when at least one real (non-null) value exists to draw. */
export function hasDrawableData(series) {
    return series.some((s) => s.data.some((p) => p.y !== null));
}
/** §22 partial-data note. Overridable by the chart's `partialNote` prop. */
export function defaultPartialNote(missing, total) {
    return `Datos parciales · faltan ${formatNumber(missing)} de ${formatNumber(total)} puntos`;
}
/** Default x tick/label formatter: dates → "d MMM", everything else → String. */
export function defaultXFormat(x) {
    if (x instanceof Date)
        return formatDate(x);
    return String(x);
}
/** Default y tick/value formatter: grouped integer (`tabular-nums` columns). */
export function defaultYFormat(y) {
    return formatNumber(y);
}
/**
 * Build the visually-hidden equivalent table (§22) from the merged cartesian
 * rows: header is [x label, ...series names], one row per x, gaps shown as "—".
 */
export function buildCartesianTable(series, cart, xFormat, yFormat, xLabel) {
    const columns = [xLabel, ...series.map((s) => s.name)];
    const rows = cart.rows.map((row) => {
        const original = cart.originals.get(row[X_KEY]);
        const first = original !== undefined ? xFormat(original) : String(row[X_KEY]);
        const rest = series.map((s) => {
            const v = row[s.name];
            return v == null ? "—" : yFormat(v);
        });
        return [first, ...rest];
    });
    return { columns, rows };
}
/** Values used to size a hidden table row for a single {name,value} distribution. */
export function percent(value, total) {
    return total > 0 ? (value / total) * 100 : 0;
}
