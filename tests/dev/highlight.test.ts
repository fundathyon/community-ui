import { describe, expect, it } from "vitest";
import { tokenize, type CodeToken } from "../../src/components/dev/highlight";

/** The non-blank tokens of a line, as "kind:text". */
const kinds = (tokens: CodeToken[] | undefined) =>
  (tokens ?? []).filter((t) => t.text.trim()).map((t) => `${t.kind}:${t.text}`);

describe("tokenize toml", () => {
  it("highlights table headers, including arrays of tables", () => {
    const [table, array] = tokenize("[http]\n[[workers.pool]]", "toml");
    expect(kinds(table)).toEqual(["muted:[", "keyword:http", "muted:]"]);
    expect(kinds(array)).toEqual(["muted:[[", "keyword:workers.pool", "muted:]]"]);
  });

  it("splits key = value and colors each kind of value", () => {
    const lines = tokenize(
      [
        'name = "payments"',
        "max_body_kb = 512",
        "ratio = 0.75",
        "enabled = true",
        "path = 'C:\\data'",
        "started = 1979-05-27T07:32:00Z",
        "big = 1_000_000",
      ].join("\n"),
      "toml",
    );
    expect(lines.map(kinds)).toEqual([
      ["keyword:name", "muted:=", 'string:"payments"'],
      ["keyword:max_body_kb", "muted:=", "number:512"],
      ["keyword:ratio", "muted:=", "number:0.75"],
      ["keyword:enabled", "muted:=", "number:true"],
      ["keyword:path", "muted:=", "string:'C:\\data'"],
      ["keyword:started", "muted:=", "number:1979-05-27T07:32:00Z"],
      ["keyword:big", "muted:=", "number:1_000_000"],
    ]);
  });

  it("handles quoted and dotted keys", () => {
    const [quoted, dotted] = tokenize('"key with space" = 1\nserver.http-port = 8080', "toml");
    expect(kinds(quoted)[0]).toBe('keyword:"key with space"');
    expect(kinds(dotted)[0]).toBe("keyword:server.http-port");
  });

  it("colors comments, trailing comments included", () => {
    const [full, trailing] = tokenize("# limits\nport = 8080 # default", "toml");
    expect(kinds(full)).toEqual(["comment:# limits"]);
    expect(kinds(trailing)).toEqual(["keyword:port", "muted:=", "number:8080", "comment:# default"]);
  });

  it("tokenizes arrays and inline tables", () => {
    const [array, inline] = tokenize('ports = [8080, 8081]\nowner = { name = "ana", admin = false }', "toml");
    expect(kinds(array)).toEqual(["keyword:ports", "muted:=", "muted:[", "number:8080", "muted:,", "number:8081", "muted:]"]);
    expect(kinds(inline)).toEqual([
      "keyword:owner", "muted:=", "muted:{", "keyword:name", "muted:=", 'string:"ana"', "muted:,",
      "keyword:admin", "muted:=", "number:false", "muted:}",
    ]);
  });

  it("does not mistake a word that starts with a number for a number", () => {
    const [line] = tokenize("region = us-east-1", "toml");
    expect(kinds(line)).toEqual(["keyword:region", "muted:=", "plain:us-east-1"]);
  });
});
