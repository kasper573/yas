import { expectTypeOf } from "vitest";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { testRecipe } from "./test.css";

it("variants can be derived from customized recipe", () => {
  type Variants = RecipeVariants<typeof testRecipe>;
  type ExpectedType = {
    foo?: 1 | 2;
    bar?: "x" | "y";
  };
  expectTypeOf<Variants>().toEqualTypeOf<ExpectedType>();
});
