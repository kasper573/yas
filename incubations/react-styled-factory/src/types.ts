import type {
  ReactElement,
  ComponentProps,
  CSSProperties,
  ReactNode,
  ElementType,
} from "react";

// Component

export interface StyledComponentFactory<SX extends SXLike> {
  <Implementation extends ImplementationLike, Variants extends VariantsLike>(
    implementation: Implementation,
    abstractStyle?: StyleLike<Variants, SX>,
  ): StyledComponent<Implementation, Variants, SX>;
}

export interface StyledComponent<
  Implementation extends ImplementationLike,
  Variants extends VariantsLike,
  SX extends SXLike,
> extends StyledComponentConstructor<Implementation, Variants, SX> {
  as<NewImplementation extends ImplementationLike>(
    as: NewImplementation,
  ): StyledComponent<NewImplementation, Variants, SX>;

  attrs(
    props: DefaultStyledComponentProps<Implementation, Variants, SX>,
  ): StyledComponent<Implementation, Variants, SX>;

  shouldForwardProp(
    tester: PropForwardTester<
      keyof StyledComponentProps<Implementation, Variants, SX>
    >,
  ): StyledComponent<Implementation, Variants, SX>;
}

interface StyledComponentConstructor<
  Implementation extends ImplementationLike,
  Variants extends VariantsLike,
  SX extends SXLike,
> {
  (props: StyledComponentProps<Implementation, Variants, SX>): ReactElement;
}

export type StyledComponentProps<
  Implementation extends ImplementationLike,
  Variants extends VariantsLike,
  SX extends SXLike,
> =
  // We must strip plain indexes to ensure no variants resolve to empty object
  StripIndexes<Variants> &
    Omit<ComponentProps<Implementation>, keyof StripIndexes<Variants>> & {
      sx?: SX;
      asChild?: boolean;
    };

export type DefaultStyledComponentProps<
  Implementation extends ImplementationLike,
  Variants extends VariantsLike,
  SX extends SXLike,
> = Partial<StyledComponentProps<Implementation, Variants, SX>>;

export type AnyStyledComponentProps = StyledComponentProps<
  ImplementationLike,
  VariantsLike,
  SXLike
>;

export interface StyledComponentOptions<
  Implementation extends ImplementationLike,
  Variants extends VariantsLike,
  SX extends SXLike,
> {
  defaultProps?: DefaultStyledComponentProps<Implementation, Variants, SX>;
  forwardProps?: PropForwardTester<
    keyof StyledComponentProps<Implementation, Variants, SX>
  >;
}

// Compile

export type SXAdapterOptions<SX extends SXLike> =
  | Partial<SXAdapter<SX>>
  | SXCompiler<SX>;

export interface SXAdapter<SX extends SXLike> {
  compile: SXCompiler<SX>;
  merge: SXMerger<SX>;
}

export type SXCompiler<SX extends SXLike> = (
  sx: SX,
) => CSSProperties | ClassName | undefined;

export type SXMerger<SX extends SXLike> = (a?: SX, b?: SX) => SX | undefined;

export interface VariantsCompiler<Variants extends VariantsLike> {
  (input?: Variants): ClassName;
  variants: () => Array<keyof Variants>;
}

export type PropForwardTester<PropName extends PropertyKey = PropertyKey> =
  (info: { name: PropName; isVariant: boolean }) => boolean;

// Data

export type ImplementationLike = ElementType;

export type ClassName = string;

/**
 * All the possible inputs for styling a component.
 */
export type StyleLike<Variants extends VariantsLike, SX extends SXLike> =
  | ClassName
  | ClassName[]
  | SX
  | VariantsCompiler<Variants>;

/**
 * SX is an abstract representation of the style of a component.
 * It has no meaning on its own, and must be passed through a compiler
 * to  be turned into a CSS object or class name.
 */
export type SXLike = Record<string, unknown>;

export type VariantsLike = Record<string, unknown>;

export type ElementPropsLike<SX> = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  sx?: SX;
};

// Utils

type StripIndexes<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};
