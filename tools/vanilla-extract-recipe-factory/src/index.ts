import type { RuntimeFn } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export function createRecipeFactory<Style, CompiledStyle extends string>(
  compileStyle: StyleCompiler<Style, CompiledStyle>,
) {
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
  CompiledStyle extends string,
>(
  options: PatternOptions<Groups, DefaultVariants, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): PatternOptions<Groups, DefaultVariants, CompiledStyle> {
  const { base, variants, defaultVariants, compoundVariants } = options;

  return {
    base: invokeOneOrMany(compileStyle, base),
    variants: compileVariants(variants, compileStyle),
    defaultVariants,
    compoundVariants: compoundVariants?.map(({ variants, style }) => ({
      variants,
      style: invokeOneOrMany(compileStyle, style) ?? [],
    })),
  };
}

function compileVariants<Groups, Style, CompiledStyle extends string>(
  variants: Variants<Groups, Style> | undefined = {} as Variants<Groups, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): Variants<Groups, CompiledStyle> {
  const map = {} as Variants<Groups, CompiledStyle>;
  for (const [groupName, groupVariants] of typedEntries(variants)) {
    const group = (map[groupName] ??= {} as never);
    for (const [variantName, variantValue] of typedEntries(groupVariants)) {
      const value = invokeOneOrMany(compileStyle, variantValue);
      if (value !== undefined) {
        group[variantName as keyof typeof group] = value;
      }
    }
  }
  return map;
}

export type StyleCompiler<Style, CompiledStyle extends string> = (
  style: Style,
) => CompiledStyle;

type Variants<Groups, T> = {
  [G in keyof Groups]: {
    [P in keyof Groups[G]]: OneOrMany<T>;
  };
};

type VariantSelection<Groups> = {
  [Group in keyof Groups]?: TreatBooleanStringAsBoolean<keyof Groups[Group]>;
};

interface CompoundVariant<Groups, T> {
  variants: VariantSelection<Groups>;
  style: OneOrMany<T>;
}

type PatternOptions<
  Groups,
  DefaultVariants extends VariantSelection<Groups>,
  T,
> = {
  base?: OneOrMany<T>;
  variants?: Variants<Groups, T>;
  defaultVariants?: DefaultVariants;
  compoundVariants?: Array<CompoundVariant<NoInfer<Groups>, T>>;
};

type OneOrMany<T> = T | T[];
type NoInfer<T> = [T][T extends any ? 0 : never];
type TreatBooleanStringAsBoolean<T> = T extends "true" | "false" ? boolean : T;

function invokeOneOrMany<I, O>(
  fn: (i: I) => O,
  input?: OneOrMany<I>,
): OneOrMany<O> | undefined {
  if (input === undefined) {
    return;
  }
  return Array.isArray(input) ? input.map(fn) : fn(input);
}

const typedEntries = Object.entries as <T>(
  o: T,
) => Array<[Extract<keyof T, string>, T[Extract<keyof T, string>]]>;
