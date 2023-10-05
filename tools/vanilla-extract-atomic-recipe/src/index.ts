import type { RuntimeFn } from "@vanilla-extract/recipes";

export interface AtomicRecipeFn<AtomicClassName extends string> {
  <Variants extends VariantGroups<AtomicClassName>>(
    options: PatternOptions<Variants, AtomicClassName>,
    debugId?: string,
  ): RuntimeFn<Variants>;
}

type RecipeStyleRule<AtomicClassName extends string> =
  | AtomicClassName
  | AtomicClassName[];

type BooleanMap<T> = T extends "true" | "false" ? boolean : T;

type VariantGroups<AtomicClassName extends string> = Record<
  string,
  Record<string, RecipeStyleRule<AtomicClassName>>
>;

type VariantSelection<
  Variants extends VariantGroups<AtomicClassName>,
  AtomicClassName extends string,
> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>;
};

interface CompoundVariant<
  Variants extends VariantGroups<AtomicClassName>,
  AtomicClassName extends string,
> {
  variants: VariantSelection<Variants, AtomicClassName>;
  style: RecipeStyleRule<AtomicClassName>;
}

type PatternOptions<
  Variants extends VariantGroups<AtomicClassName>,
  AtomicClassName extends string,
> = {
  base?: RecipeStyleRule<AtomicClassName>;
  variants?: Variants;
  defaultVariants?: VariantSelection<Variants, AtomicClassName>;
  compoundVariants?: Array<CompoundVariant<Variants, AtomicClassName>>;
};
