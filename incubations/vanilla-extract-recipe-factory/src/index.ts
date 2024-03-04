import { recipe } from "@vanilla-extract/recipes";
import type { ComplexStyleRule } from "@vanilla-extract/css";

export function createRecipeFactory<
  Style,
  CompiledStyle extends CompiledStyleLike,
>(compileStyle: StyleCompiler<Style, CompiledStyle>) {
  return function specializedRecipe<
    Groups,
    DefaultVariants extends VariantSelection<Groups>,
  >(
    options: PatternOptions<Groups, DefaultVariants, Style>,
    debugId?: string,
  ): RuntimeFn<Variants<Groups, CompiledStyle>> {
    return recipe(compileOptions(options, compileStyle), debugId);
  };
}

function compileOptions<
  Groups,
  DefaultVariants extends VariantSelection<Groups>,
  Style,
  CompiledStyle extends CompiledStyleLike,
>(
  options: PatternOptions<Groups, DefaultVariants, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): PatternOptions<Groups, DefaultVariants, CompiledStyle> {
  const { base, variants, defaultVariants, compoundVariants } = options;

  return {
    base: base ? compileStyle(base) : undefined,
    variants: compileVariants(variants, compileStyle),
    defaultVariants,
    compoundVariants: compoundVariants?.map(({ variants, style }) => ({
      variants,
      style: compileStyle(style),
    })),
  };
}

function compileVariants<
  Groups,
  Style,
  CompiledStyle extends CompiledStyleLike,
>(
  variants: Variants<Groups, Style> | undefined = {} as Variants<Groups, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): Variants<Groups, CompiledStyle> {
  const map = {} as Variants<Groups, CompiledStyle>;
  for (const [groupName, groupVariants] of typedEntries(variants)) {
    const group = (map[groupName] ??= {} as (typeof map)[typeof groupName]);
    for (const [variantName, variantValue] of typedEntries(groupVariants)) {
      const value = compileStyle(variantValue);
      if (value !== undefined) {
        group[variantName as keyof typeof group] = value;
      }
    }
  }
  return map;
}

export type StyleCompiler<Style, CompiledStyle extends CompiledStyleLike> = (
  style: Style,
) => CompiledStyle;

export type CompiledStyleLike = string | string[] | ComplexStyleRule;

export type RecipeVariants<T> =
  T extends RuntimeFn<infer Groups> ? VariantSelection<Groups> : never;

export interface RuntimeFn<Groups> {
  (options?: VariantSelection<Groups>): string;
  variants: () => (keyof Groups)[];
  classNames: RecipeClassNames<Groups>;
}

type RecipeClassNames<Groups> = {
  base: string;
  variants: VariantsClassNames<Groups>;
};

type VariantsClassNames<Groups> = {
  [G in keyof Groups]: {
    [P in keyof Groups[G]]: string;
  };
};

type Variants<Groups, T> = {
  [G in keyof Groups]: {
    [P in keyof Groups[G]]: T;
  };
};

type VariantSelection<Groups> = {
  [Group in keyof Groups]?: VariantValue<keyof Groups[Group]>;
};

type VariantValue<T extends PropertyKey | boolean> = ValueOf<{
  [K in T as BooleanStringOf<K>]: NumberOfNumericStringOrNumericStringOr<
    K,
    BooleanOfBooleanStringOrBooleanStringOr<K, K>
  >;
}>;

interface CompoundVariant<Groups, T> {
  variants: VariantSelection<Groups>;
  style: T;
}

type PatternOptions<
  Groups,
  DefaultVariants extends VariantSelection<Groups>,
  T,
> = {
  base?: T;
  variants?: Variants<Groups, T>;
  defaultVariants?: DefaultVariants;
  compoundVariants?: Array<CompoundVariant<NoInfer<Groups>, T>>;
};

type NoInfer<T> = [T][T extends any ? 0 : never];

type BooleanOfBooleanStringOrBooleanStringOr<T, Fallback = never> = T extends
  | "true"
  | "false"
  ? boolean
  : Fallback;

type NumberOfNumericStringOrNumericStringOr<
  T,
  Fallback = never,
> = T extends `${infer N extends number}` ? N : Fallback;

type BooleanStringOf<T> = T extends boolean ? `${T}` : T & PropertyKey;

type ValueOf<T> = T[keyof T];

const typedEntries = Object.entries as <T>(
  o: T,
) => Array<[Extract<keyof T, string>, T[Extract<keyof T, string>]]>;
