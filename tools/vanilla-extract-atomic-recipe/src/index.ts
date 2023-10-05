import type { RuntimeFn } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

export function createAtomicRecipeFactory<AtomInputs, AtomId extends string>(
  compileAtom: AtomCompiler<AtomInputs, AtomId>,
) {
  return function atomicRecipe<V extends Variants<AtomInputs>>(
    options: PatternOptions<V, AtomInputs>,
    debugId?: string,
  ): RuntimeFn<mapVariants<V, AtomId>> {
    return recipe(compileOptions(options, compileAtom), debugId);
  };
}

function compileOptions<
  V extends Variants<AtomInputs>,
  AtomInputs,
  AtomId extends string,
>(
  options: PatternOptions<V, AtomInputs, V>,
  compileAtom: AtomCompiler<AtomInputs, AtomId>,
): PatternOptions<V, AtomId> {
  const { base, variants, defaultVariants, compoundVariants } = options;

  return {
    base: invokeOneOrMany(compileAtom, base),
    variants: compileVariants(variants, compileAtom),
    defaultVariants,
    compoundVariants: compoundVariants?.map(({ variants, style }) => ({
      variants,
      style: invokeOneOrMany(compileAtom, style) ?? [],
    })),
  };
}

function compileVariants<
  V extends Variants<AtomInputs>,
  AtomInputs,
  AtomId extends string,
>(
  variants: V | undefined = {} as V,
  compileAtom: AtomCompiler<AtomInputs, AtomId>,
): mapVariants<V, AtomId> {
  const map = {} as mapVariants<V, AtomId>;
  for (const [groupName, groupVariants] of typedEntries(variants)) {
    const group = (map[groupName] ??= {} as never);
    for (const [variantName, variantValue] of typedEntries(groupVariants)) {
      const value = invokeOneOrMany(compileAtom, variantValue);
      if (value !== undefined) {
        group[variantName] = value;
      }
    }
  }
  return map;
}

export type AtomCompiler<AtomInputs, AtomId extends string> = (
  inputs: AtomInputs,
) => AtomId;

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
