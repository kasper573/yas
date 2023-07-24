import { produce } from "immer";
import type { ZodFirstPartyTypeKind, ZodType } from "zod";
import { ZodDefault, ZodEffects, ZodNullable, ZodOptional } from "zod";
import type { FormValueType } from "./types/commonTypes";
import type { AnyComponent } from "./types/utilityTypes";
import type { DictionarySet } from "./types/utilityTypes";

export type TypedComponents = TypedComponentTuple[];

export type TypedComponentTuple = [
  type: FormValueType,
  component: AnyComponent,
];

export type SetTypedComponent<
  Existing extends TypedComponents,
  Type extends FormValueType,
  Component extends AnyComponent,
> = DictionarySet<Existing, Type, Component>;

export function getTypedComponent(
  components: TypedComponents,
  type: FormValueType,
): AnyComponent | undefined {
  const tuple = components.find(([candidate]) =>
    isMatchingType(type, candidate),
  );
  return tuple ? tuple[1] : undefined;
}

export function setTypedComponent<
  Existing extends TypedComponents,
  Type extends FormValueType,
  Component extends AnyComponent,
>(
  components: Existing,
  type: Type,
  component: Component,
): SetTypedComponent<Existing, Type, Component> {
  return produce(components, (draft) => {
    const index = draft.findIndex(([candidate]) =>
      isMatchingType(type, candidate),
    );
    if (index >= 0) {
      draft[index] = [type, component];
    } else {
      draft.push([type, component]);
    }
  }) as unknown as SetTypedComponent<Existing, Type, Component>;
}

function isMatchingType(type: FormValueType, candidate: FormValueType) {
  return (
    describeType(normalizeType(type)) === describeType(normalizeType(candidate))
  );
}

export function describeType(type: ZodType): ZodFirstPartyTypeKind {
  if ("typeName" in type._def) {
    return type._def.typeName as ZodFirstPartyTypeKind;
  }
  throw new Error(`Could not determine first party type`);
}

function normalizeType(type: ZodType): ZodType {
  while (
    type instanceof ZodEffects ||
    type instanceof ZodOptional ||
    type instanceof ZodNullable ||
    type instanceof ZodDefault
  ) {
    type = type instanceof ZodEffects ? type.innerType() : type._def.innerType;
  }
  return type;
}
