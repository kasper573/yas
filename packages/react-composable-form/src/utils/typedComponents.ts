import type { ValueType } from "../types/commonTypes";
import type {
  AnyComponent,
  AnyProps,
  DictionaryGet,
  DictionarySet,
} from "../types/utilityTypes";
import type { TypedComponentRegistry } from "../types/optionTypes";
import { isMatchingType } from "./isMatchingType";

export type TypedComponents<FieldProps extends AnyProps = AnyProps> =
  TypedComponentTuple<FieldProps>[];

export type TypedComponentTuple<FieldProps extends AnyProps = AnyProps> = [
  type: any,
  component: AnyComponent
];

export type GetTypedComponent<
  Existing extends TypedComponents,
  Value
> = DictionaryGet<Existing, Value>;

export type SetTypedComponent<
  Existing extends TypedComponents,
  Value,
  Component extends AnyComponent
> = DictionarySet<Existing, Value, Component>;

export function getTypedComponent<Components extends TypedComponents>(
  components: TypedComponentRegistry<Components>,
  type: ValueType
): AnyComponent | undefined {
  const tuple = components.find(([candidate]) =>
    isMatchingType(type, candidate)
  );
  return tuple ? tuple[1] : undefined;
}

export function setTypedComponent<Components extends TypedComponents>(
  components: TypedComponentRegistry<Components>,
  type: ValueType,
  component: AnyComponent
) {
  const copy = [...components] as TypedComponentRegistry<Components>;
  const index = components.findIndex(([candidate]) =>
    isMatchingType(type, candidate)
  );
  if (index >= 0) {
    copy[index] = [type, component];
  } else {
    copy.push([type, component]);
  }
  return copy;
}
