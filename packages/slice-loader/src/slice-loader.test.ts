import sliceLoader from "./slice-loader";

describe("slice-loader", () => {
  it(`should return the correct slices for "export const"`, () => {
    const result = sliceLoader(
      `export const foo: number = 2;
export const bar: string = "foo";`,
    );
    expect(result).toEqual(
      toSerializedModule({
        foo: `export const foo: number = 2;`,
        bar: `export const bar: string = "foo";`,
      }),
    );
  });

  it(`should return the correct slices for "export function"`, () => {
    const result = sliceLoader(
      `export function foo (): number { return 2; }
export function bar (): string { return "foo"; }`,
    );
    expect(result).toEqual(
      toSerializedModule({
        foo: `export function foo (): number { return 2; }`,
        bar: `export function bar (): string { return "foo"; }`,
      }),
    );
  });
});

function toSerializedModule(exports: Record<string, string>) {
  let str = "";
  for (const [exportName, slice] of Object.entries(exports)) {
    str += `export const ${exportName} = ${JSON.stringify(slice)};\n`;
  }
  return str;
}
