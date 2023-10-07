import { expectTypeOf } from "vitest";
import type { RuntimeFn } from "@vanilla-extract/recipes";
import { createRecipeFactory } from "../index";
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

it("supports rich set of variants and defaultVariants", () => {
  createRecipeFactory((style: object) => "whatever")({
    variants: {
      size: {
        small: {
          fontSize: "x",
        },
        medium: {
          fontSize: "y",
        },
      },
      color: {
        primary: {
          background: "a",
        },
        secondary: {
          background: "b",
        },
      },
      variant: {
        contained: {
          borderRadius: 123,
        },
        outlined: {
          background: false,
        },
      },
      disabled: {
        true: {},
        false: {},
      },
    },
    defaultVariants: {
      size: "small",
      variant: "outlined",
      color: "primary",
      disabled: false,
    },
  });
});

type inferVariants<T> = T extends RuntimeFn<infer Groups>
  ? keyof Groups
  : never;
