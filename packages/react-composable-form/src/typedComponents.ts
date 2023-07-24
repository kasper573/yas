import { produce } from "immer";
import type { FormValueType } from "./types/commonTypes";
import type { AnyComponent, DictionarySet } from "./types/utilityTypes";
import { isMatchingType } from "./isMatchingType";

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
