import sliceLoader from "./slice-loader";

describe("slice-loader", () => {
  it("should return the correct slices", () => {
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
});

function toSerializedModule(exports: Record<string, string>) {
  return `export default ${JSON.stringify(exports)}`;
}
