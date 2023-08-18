import { z } from "zod";
import { getBrand, monkeyPatchZodBranded } from "./monkeyPatchZodBranded";

it("can monkey patch zod branded", () => {
  const restore = monkeyPatchZodBranded();
  const type = z.string().brand("test");
  expect(getBrand(type)).toBe("test");
  restore();
});
