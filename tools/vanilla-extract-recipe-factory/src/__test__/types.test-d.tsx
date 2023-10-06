import { expectTypeOf } from "vitest";
import type { RuntimeFn } from "@vanilla-extract/recipes";
import { customRecipe, regularRecipe } from "./test.css";

it("identical custom and regular recipes produce the same variant types", () => {
  const regularVariants = regularRecipe.variants();
  const customVariants = customRecipe.variants();
  expectTypeOf(regularVariants).toEqualTypeOf(customVariants);
});

it("identical custom and regular recipes produce the same variant types (alternate)", () => {
  type RegularVariants = inferVariants<typeof regularRecipe>;
  type CustomVariants = inferVariants<typeof customRecipe>;
  expectTypeOf<RegularVariants>().toEqualTypeOf<CustomVariants>();
});

type inferVariants<T> = T extends RuntimeFn<infer Groups>
  ? keyof Groups
  : never;
