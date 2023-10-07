import type { CSSProperties, StyleRule } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";

export function createAtomFactory<
  Properties extends PropertyDefinitions,
  Shorthands extends Record<string, Array<keyof Properties>>,
>(
  definition: Definition<Properties, Shorthands>,
): AtomFactory<InputFor<Properties, Shorthands>> {
  return (input) => style(inputToStyle(input, definition));
}

function inputToStyle<
  Properties extends PropertyDefinitions,
  Shorthands extends Record<string, Array<keyof Properties>>,
>(
  input: InputFor<Properties, Shorthands>,
  def: Definition<Properties, Shorthands>,
): StyleRule {
  const style: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (key.startsWith(":")) {
      style[key] = inputToStyle(value as InputFor<Properties, Shorthands>, def);
      continue;
    }

    const props: string[] =
      def.shorthands && key in def.shorthands
        ? (def.shorthands[key] as string[])
        : [key];

    for (const prop of props) {
      if (!(prop in def.properties)) {
        throw new Error(`Invalid property: ${String(prop)}`);
      }
      const options = def.properties[prop as keyof typeof def.properties];
      if (Array.isArray(options)) {
        if (!options.includes(value)) {
          throw new Error(`Invalid value for ${String(prop)}: ${value}`);
        }
        style[prop] = value;
      } else {
        if (!(options as object).hasOwnProperty(value as PropertyKey)) {
          throw new Error(`Invalid value for ${String(prop)}: ${value}`);
        }
        style[prop] = (options as Record<string, unknown>)[value as string];
      }
    }
  }
  return style;
}

type ArrayOrRecord<T> = readonly T[] | Record<string, T>;

type PropertyDefinitions = {
  [K in keyof CSSProperties]: ArrayOrRecord<CSSProperties[K]>;
};

interface Definition<
  Properties extends PropertyDefinitions,
  Shorthands extends Record<string, Array<keyof Properties>>,
> {
  properties: Properties;
  shorthands?: Shorthands;
}

type InputFor<
  Properties extends PropertyDefinitions,
  Shorthands extends Record<string, Array<keyof Properties>>,
> = InputForImpl<Properties, Shorthands> & {
  selectors?: {
    [key: string]: InputForImpl<Properties, Shorthands>;
  };
} & {
  [K in EtcStyleKeys]?: InputForImpl<Properties, Shorthands>;
};

type InputForImpl<
  Properties extends PropertyDefinitions,
  Shorthands extends Record<string, Array<keyof Properties>>,
> = {
  [K in keyof Shorthands]?: InputForProperty<Properties[Shorthands[K][number]]>;
} & {
  [K in keyof Properties]?: InputForProperty<Properties[K]>;
};

type InputForProperty<T> = T extends ReadonlyArray<infer V>
  ? V
  : T extends Record<infer K, infer _>
  ? K
  : never;

type EtcStyleKeys = Exclude<keyof StyleRule, keyof CSSProperties | "selectors">;

type AtomFactory<Input> = (input: Input) => string;
