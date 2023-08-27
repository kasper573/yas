import sliceLoader from "./slice-loader";

describe("slice-loader", () => {
  it("should throw when export doesn't exist", () => {
    const context = { query: "?names=bar", resourcePath: "foo.ts" };
    const trySlice = () =>
      sliceLoader.call(
        context,
        `import "./foo";
const constNotExported = 1 as const;
export const inlineExportConst: number = 2;
const constExported: string = "foo";
export {constExported};
export default 123;`,
      );
    expect(trySlice).toThrow(
      `Module foo.ts does not contain an export with name "bar".`,
    );
  });

  it("should return the correct slice for existing export", () => {
    const context = {
      query: "?names=inlineExportConst",
      resourcePath: "foo.ts",
    };
    const result = sliceLoader.call(
      context,
      `import "./foo";
const constNotExported = 1 as const;
export const inlineExportConst: number = 2;
const constExported: string = "foo";
export {constExported};
export default 123;`,
    );
    expect(result).toEqual(
      toSerializedModule({
        inlineExportConst: `export const inlineExportConst: number = 2;`,
      }),
    );
  });

  it("should return the correct slice for existing export in simple file", () => {
    const context = { query: "?names=bar", resourcePath: "foo.ts" };
    const result = sliceLoader.call(
      context,
      `export const foo: number = 2;
export const bar: string = "foo";`,
    );
    expect(result).toEqual(
      toSerializedModule({ bar: `export const bar: string = "foo";` }),
    );
  });

  it("should return the correct slices when requesting multiple", () => {
    const context = { query: "?names=bar,foo", resourcePath: "foo.ts" };
    const result = sliceLoader.call(
      context,
      `export const foo: number = 2;
export const bar: string = "foo";`,
    );
    expect(result).toEqual(
      toSerializedModule({
        bar: `export const bar: string = "foo";`,
        foo: `export const foo: number = 2;`,
      }),
    );
  });
});

function toSerializedModule(exports: Record<string, string>) {
  return `export default ${JSON.stringify(exports)}`;
}
