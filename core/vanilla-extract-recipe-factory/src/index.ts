import type {
  RuntimeFn,
  RecipeVariants as RecipeVariantsImpl,
} from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

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

export type CompiledStyleLike = string | string[];

export type RecipeVariants<RecipeLike extends RuntimeFn<Record<string, any>>> =
  Exclude<RecipeVariantsImpl<RecipeLike>, undefined>;

type Variants<Groups, T> = {
  [G in keyof Groups]: {
    [P in keyof Groups[G]]: T;
  };
};

type VariantSelection<Groups> = {
  [Group in keyof Groups]?: TreatBooleanStringAsBoolean<keyof Groups[Group]>;
};

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
type TreatBooleanStringAsBoolean<T> = T extends "true" | "false" ? boolean : T;

const typedEntries = Object.entries as <T>(
  o: T,
) => Array<[Extract<keyof T, string>, T[Extract<keyof T, string>]]>;
