import type { RuntimeFn } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export function createRecipeFactory<Style, CompiledStyle extends string>(
  compileStyle: StyleCompiler<Style, CompiledStyle>,
) {
  return function specializedRecipe<V extends Variants<Style>>(
    options: PatternOptions<V, Style>,
    debugId?: string,
  ): RuntimeFn<mapVariants<V, CompiledStyle>> {
    return recipe(compileOptions(options, compileStyle), debugId);
  };
}

function compileOptions<
  V extends Variants<Style>,
  Style,
  CompiledStyle extends string,
>(
  options: PatternOptions<V, Style, V>,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): PatternOptions<V, CompiledStyle> {
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

function compileVariants<
  V extends Variants<Style>,
  Style,
  CompiledStyle extends string,
>(
  variants: V | undefined = {} as V,
  compileStyle: StyleCompiler<Style, CompiledStyle>,
): mapVariants<V, CompiledStyle> {
  const map = {} as mapVariants<V, CompiledStyle>;
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

type Groups<T = unknown> = Record<string, Record<string, T>>;
type Variants<T> = Groups<OneOrMany<T>>;
type mapVariants<V extends Groups, NewT> = {
  [K in keyof V]: {
    [P in keyof V[K]]: OneOrMany<NewT>;
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

type PatternOptions<
  G extends Groups,
  T,
  V extends Groups = mapVariants<G, T>,
> = {
  base?: OneOrMany<T>;
  variants?: V;
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
