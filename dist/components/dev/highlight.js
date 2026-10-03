/**
 * Internal line-based tokenizer for CodeBlock (§20).
 *
 * The design system mandates THREE semantic colors for code — accent for the
 * verb/keyword, success for strings, normal text for the rest (text-muted for
 * comments/punctuation) — not a full syntax palette that would compete with
 * the UI. That rule is why this module exists instead of an external
 * highlighter: a tiny per-line scanner is all the fidelity §20 allows.
 *
 * Not exported from the domain barrel — only `CodeLanguage` leaves this file
 * (re-exported through code-block.tsx).
 */
/**
 * Kind → token-mapped utility class (§20): keyword=accent, string=success,
 * comment/punctuation=text-muted, primitives/vars=info. No italics (§03).
 */
export const TOKEN_CLASS = {
    plain: "",
    keyword: "text-accent",
    string: "text-success",
    comment: "text-text-muted",
    muted: "text-text-muted",
    number: "text-info",
};
/** Common commands highlighted anywhere in a bash line, not only at line start. */
const BASH_COMMANDS = new Set([
    "curl",
    "docker",
    "git",
    "kubectl",
    "npm",
    "pnpm",
    "export",
    "sudo",
    "node",
    "echo",
    "cd",
    "sh",
]);
function tokenizeBashLine(line, continuation) {
    const tokens = [];
    let i = 0;
    let sawCommand = continuation;
    const push = (text, kind) => {
        if (text)
            tokens.push({ text, kind });
    };
    while (i < line.length) {
        const rest = line.slice(i);
        let m = rest.match(/^\s+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^#.*$/);
        if (m) {
            push(m[0], "comment");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^"(?:[^"\\]|\\.)*(?:"|$)/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^'[^']*(?:'|$)/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        // $VAR / ${VAR} — highlighted lightly (info), per §20 "accent-lite".
        m = rest.match(/^\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        // Options (-H, --header) stay plain and never count as the command verb.
        m = rest.match(/^--?[\w-]+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^[A-Za-z0-9_][\w.:/@-]*/);
        if (m) {
            const word = m[0];
            // FOO=bar env assignment prefix — not the verb.
            if (rest.charAt(word.length) === "=") {
                push(word, "plain");
                i += word.length;
                continue;
            }
            const keyword = !sawCommand || BASH_COMMANDS.has(word);
            sawCommand = true;
            push(word, keyword ? "keyword" : "plain");
            i += word.length;
            continue;
        }
        m = rest.match(/^(?:\|\||&&|;|\|)/);
        if (m) {
            push(m[0], "muted");
            sawCommand = false; // a new command follows the separator
            i += m[0].length;
            continue;
        }
        push(rest.charAt(0), "plain");
        i += 1;
    }
    return tokens;
}
function tokenizeJsonLine(line) {
    const tokens = [];
    let i = 0;
    const push = (text, kind) => {
        if (text)
            tokens.push({ text, kind });
    };
    while (i < line.length) {
        const rest = line.slice(i);
        let m = rest.match(/^\s+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^"(?:[^"\\]|\\.)*(?:"|$)/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^(?:true|false|null)\b/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = rest.match(/^[{}[\]:,]+/);
        if (m) {
            push(m[0], "muted");
            i += m[0].length;
            continue;
        }
        push(rest.charAt(0), "plain");
        i += 1;
    }
    return tokens;
}
function tokenizeYamlValue(rest, push) {
    let i = 0;
    while (i < rest.length) {
        const chunk = rest.slice(i);
        let m = chunk.match(/^\s+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^#.*$/);
        if (m) {
            push(m[0], "comment");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^"(?:[^"\\]|\\.)*(?:"|$)/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^'[^']*(?:'|$)/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^-?\d+(?:\.\d+)?(?=\s|$)/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^(?:true|false|null|~)(?=\s|$)/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^[^\s#"']+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        push(chunk.charAt(0), "plain");
        i += 1;
    }
}
function tokenizeYamlLine(line) {
    const tokens = [];
    const push = (text, kind) => {
        if (text)
            tokens.push({ text, kind });
    };
    if (/^\s*#/.test(line)) {
        push(line, "comment");
        return tokens;
    }
    const key = line.match(/^(\s*)(- )?([\w.$/-]+)(\s*)(:)(?=\s|$)/);
    if (key) {
        push(key[1] ?? "", "plain");
        push(key[2] ?? "", "muted");
        push(key[3] ?? "", "keyword");
        push(key[4] ?? "", "plain");
        push(key[5] ?? "", "muted");
        tokenizeYamlValue(line.slice(key[0].length), push);
        return tokens;
    }
    const item = line.match(/^(\s*)(- )/);
    if (item) {
        push(item[1] ?? "", "plain");
        push(item[2] ?? "", "muted");
        tokenizeYamlValue(line.slice(item[0].length), push);
        return tokens;
    }
    tokenizeYamlValue(line, push);
    return tokens;
}
function tokenizeTomlValue(rest, push) {
    let i = 0;
    while (i < rest.length) {
        const chunk = rest.slice(i);
        let m = chunk.match(/^\s+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^#.*$/);
        if (m) {
            push(m[0], "comment");
            i += m[0].length;
            continue;
        }
        // Basic and literal strings, also the opening/closing line of a """ block.
        m = chunk.match(/^(?:"""|"(?:[^"\\]|\\.)*(?:"|$)|'''|'[^']*(?:'|$))/);
        if (m) {
            push(m[0], "string");
            i += m[0].length;
            continue;
        }
        // Dates and times (1979-05-27T07:32:00Z) before plain numbers.
        m = chunk.match(/^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?|^\d{2}:\d{2}:\d{2}(?:\.\d+)?/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^(?:[+-]?(?:0x[\da-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:\d[\d_]*)(?:\.[\d_]+)?(?:[eE][+-]?\d+)?|inf|nan)|true|false)(?=[\s,\]}#]|$)/);
        if (m) {
            push(m[0], "number");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^[[\]{},=.]+/);
        if (m) {
            push(m[0], "muted");
            i += m[0].length;
            continue;
        }
        // Keys inside an inline table ({ name = "x" }).
        m = chunk.match(/^[\w-]+(?=\s*=)/);
        if (m) {
            push(m[0], "keyword");
            i += m[0].length;
            continue;
        }
        m = chunk.match(/^[^\s#"'[\]{},=]+/);
        if (m) {
            push(m[0], "plain");
            i += m[0].length;
            continue;
        }
        push(chunk.charAt(0), "plain");
        i += 1;
    }
}
/** Bare, quoted and dotted keys: `name`, `"a b"`, `server.http-port`. */
const TOML_KEY = String.raw `(?:[\w-]+|"(?:[^"\\]|\\.)*"|'[^']*')(?:\s*\.\s*(?:[\w-]+|"(?:[^"\\]|\\.)*"|'[^']*'))*`;
const TOML_TABLE = new RegExp(String.raw `^(\s*)(\[\[?)(\s*${TOML_KEY}\s*)(\]\]?)(.*)$`);
const TOML_ASSIGN = new RegExp(String.raw `^(\s*)(${TOML_KEY})(\s*)(=)`);
function tokenizeTomlLine(line) {
    const tokens = [];
    const push = (text, kind) => {
        if (text)
            tokens.push({ text, kind });
    };
    if (/^\s*#/.test(line)) {
        push(line, "comment");
        return tokens;
    }
    // [table] and [[array.of.tables]] headers.
    const table = line.match(TOML_TABLE);
    if (table) {
        push(table[1] ?? "", "plain");
        push(table[2] ?? "", "muted");
        push(table[3] ?? "", "keyword");
        push(table[4] ?? "", "muted");
        tokenizeTomlValue(table[5] ?? "", push);
        return tokens;
    }
    const key = line.match(TOML_ASSIGN);
    if (key) {
        push(key[1] ?? "", "plain");
        push(key[2] ?? "", "keyword");
        push(key[3] ?? "", "plain");
        push(key[4] ?? "", "muted");
        tokenizeTomlValue(line.slice(key[0].length), push);
        return tokens;
    }
    // Continuation lines of a multi-line array or string.
    tokenizeTomlValue(line, push);
    return tokens;
}
const HTTP_METHODS = /^(GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS|TRACE|CONNECT)(\s+)(\S+)(.*)$/;
function tokenizeHttpLine(line) {
    const tokens = [];
    const push = (text, kind) => {
        if (text)
            tokens.push({ text, kind });
    };
    const request = line.match(HTTP_METHODS);
    if (request) {
        push(request[1] ?? "", "keyword");
        push(request[2] ?? "", "plain");
        push(request[3] ?? "", "plain");
        push(request[4] ?? "", "muted");
        return tokens;
    }
    const status = line.match(/^(HTTP\/[\d.]+)(\s+)(\d{3})(.*)$/);
    if (status) {
        push(status[1] ?? "", "muted");
        push(status[2] ?? "", "plain");
        push(status[3] ?? "", "number");
        push(status[4] ?? "", "plain");
        return tokens;
    }
    const header = line.match(/^([A-Za-z][\w-]*)(:)(.*)$/);
    if (header) {
        push(header[1] ?? "", "muted");
        push(header[2] ?? "", "muted");
        push(header[3] ?? "", "plain");
        return tokens;
    }
    push(line, "plain");
    return tokens;
}
function plainLine(line) {
    return line ? [{ text: line, kind: "plain" }] : [];
}
/**
 * Tokenize `code` into per-line token arrays. One entry per line; empty lines
 * yield an empty array. State across lines is minimal by design: bash `\`
 * continuations (the next line is not a new command) and the blank line that
 * separates HTTP headers from the body (tokenized as JSON afterwards).
 */
export function tokenize(code, language = "text") {
    const lines = code.replace(/\n$/, "").split("\n");
    if (language === "bash") {
        let continued = false;
        return lines.map((line) => {
            const tokens = tokenizeBashLine(line, continued);
            continued = /\\\s*$/.test(line) && !/^\s*#/.test(line);
            return tokens;
        });
    }
    if (language === "json")
        return lines.map(tokenizeJsonLine);
    if (language === "yaml")
        return lines.map(tokenizeYamlLine);
    if (language === "toml")
        return lines.map(tokenizeTomlLine);
    if (language === "http") {
        let inBody = false;
        return lines.map((line) => {
            if (inBody)
                return tokenizeJsonLine(line);
            if (line.trim() === "") {
                inBody = true;
                return [];
            }
            return tokenizeHttpLine(line);
        });
    }
    return lines.map(plainLine);
}
