import {
  escape,
  htmlTrim,
  idGenerator,
  memoize
} from "../../src/ts/core/utils";

describe("escape", () => {
  test("normal strings", () => {
    const text = "abc";
    expect(escape(text)).toBe(text);
  });

  test("special symbols", () => {
    const text = "<ok>";
    expect(escape(text)).toBe("&lt;ok&gt;");
  });
});

describe("htmlTrim", () => {
  test("basic use", () => {
    expect(htmlTrim("abc")).toBe("abc");
    expect(htmlTrim("  abc")).toBe(" abc");
    expect(htmlTrim("abc  ")).toBe("abc ");
    expect(htmlTrim("   abc   ")).toBe(" abc ");
    expect(htmlTrim("abc\n   ")).toBe("abc ");
    expect(htmlTrim("\n ")).toBe(" ");
    expect(htmlTrim(" \n ")).toBe(" ");
    expect(htmlTrim("  ")).toBe(" ");
    expect(htmlTrim("")).toBe("");
  });
});

describe("idGenerator", () => {
  test("basic use", () => {
    let gen = idGenerator();
    expect(gen()).toBe(1);
    expect(gen()).toBe(2);
    expect(gen()).toBe(3);
  });
});

describe("memoize", () => {
  test("return correct value", () => {
    const f = memoize((a, b) => a + b);
    expect(f(1, 3)).toBe(4);
  });

  test("does not recompute if not needed", () => {
    let nCalls = 0;
    function origFunction(a: number, b: number): number {
      nCalls++;
      return a + b;
    }
    const memoized = memoize(origFunction);

    expect(memoized(1, 3)).toBe(4);
    expect(memoized(1, 3)).toBe(4);
    expect(nCalls).toBe(1);
  });
});