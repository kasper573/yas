import { z } from "zod";
import { it, expect } from "@yas/test/vitest/node";
import {
  getBrand,
  monkeyPatchZodBranded,
} from "../src/utils/monkeyPatchZodBranded";

it("can monkey patch zod branded", () => {
  const restore = monkeyPatchZodBranded();
  const type = z.string().brand("test");
  expect(getBrand(type)).toBe("test");
  restore();
});
