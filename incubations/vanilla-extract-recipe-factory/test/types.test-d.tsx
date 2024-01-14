import { describe, it, expectTypeOf } from "@yas/test/vitest/react";
import { createRecipeFactory } from "../src";
import { customRecipe, regularRecipe } from "./test.css";

describe("identical custom and regular recipes produce the same variant", () => {
  it("names, using .variants()", () => {
    const regularVariants = regularRecipe.variants();
    const customVariants = customRecipe.variants();
    expectTypeOf(regularVariants).toEqualTypeOf(customVariants);
  });

  it("names, using infer", () => {
    type RegularVariants = inferVariantNames<typeof regularRecipe>;
    type CustomVariants = inferVariantNames<typeof customRecipe>;
    expectTypeOf<RegularVariants>().toEqualTypeOf<CustomVariants>();
  });

  it("types", () => {
    type RegularVariants = inferVariants<typeof regularRecipe>;
    type CustomVariants = inferVariants<typeof customRecipe>;
    expectTypeOf<RegularVariants["foo"]>().toEqualTypeOf<
      CustomVariants["foo"]
    >();
    expectTypeOf<RegularVariants["bar"]>().toEqualTypeOf<
      CustomVariants["bar"]
    >();
    expectTypeOf<RegularVariants["baz"]>().toEqualTypeOf<
      CustomVariants["baz"]
    >();
  });
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

type inferVariants<T> = T extends (variants?: infer V) => unknown ? V : never;

type inferVariantNames<T> = keyof inferVariants<T>;
