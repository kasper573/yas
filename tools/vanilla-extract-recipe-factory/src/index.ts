import type { RuntimeFn } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export function createRecipeFactory<Style, CompiledStyle extends string>(
  compileStyle: StyleCompiler<Style, CompiledStyle>,
) {
  return function specializedRecipe<G extends Groups>(
    options: PatternOptions<G, Style>,
    debugId?: string,
  ): RuntimeFn<Variants<G, CompiledStyle>> {
    return recipe(compileOptions(options, compileStyle), debugId);
  };
}

function compileOptions<G extends Groups, Style, CompiledStyle extends string>(
  options: PatternOptions<G, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): PatternOptions<G, CompiledStyle> {
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

function compileVariants<G extends Groups, Style, CompiledStyle extends string>(
  variants: Variants<G, Style> | undefined = {} as Variants<G, Style>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): Variants<G, CompiledStyle> {
  const map = {} as Variants<G, CompiledStyle>;
  for (const [groupName, groupVariants] of typedEntries(variants)) {
    const group = (map[groupName] ??= {} as never);
    for (const [variantName, variantValue] of typedEntries(groupVariants)) {
      const value = invokeOneOrMany(compileStyle, variantValue);
      if (value !== undefined) {
        group[variantName] = value;
      }
    }
  }
  return map;
}

export type StyleCompiler<Style, CompiledStyle extends string> = (
  style: Style,
) => CompiledStyle;

type Groups = Record<string, Record<string, unknown>>;
type Variants<G extends Groups, T> = {
  [K in keyof G]: {
    [P in keyof G[K]]: OneOrMany<T>;
  };
};

type BooleanMap<T> = T extends "true" | "false" ? boolean : T;
type VariantSelection<G extends Groups> = {
  [Group in keyof G]?: BooleanMap<keyof G[Group]>;
};

interface CompoundVariant<G extends Groups, T> {
  variants: VariantSelection<G>;
  style: OneOrMany<T>;
}

type PatternOptions<G extends Groups, T> = {
  base?: OneOrMany<T>;
  variants?: Variants<G, T>;
  defaultVariants?: VariantSelection<G>;
  compoundVariants?: Array<CompoundVariant<G, T>>;
};

type OneOrMany<T> = T | T[];
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
