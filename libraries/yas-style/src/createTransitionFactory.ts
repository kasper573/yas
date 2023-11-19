import type { Atoms } from "./atoms.css";

export function createTransitionFactory<Presets extends Record<string, string>>(
  presets: Presets,
) {
  return function createTransition<
    Transitions extends Transition<keyof Presets>[],
  >(transitions: Transitions): string {
    return transitions
      .map(([property, preset]) => `${property} ${presets[preset]}`)
      .join(", ");
  };
}

type Transition<Preset extends PropertyKey> = [
  property: keyof Atoms,
  preset: Preset,
];
