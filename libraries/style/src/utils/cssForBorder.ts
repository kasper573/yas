import { tokens } from "@yas/design-tokens";

export function cssForBorder(name: keyof typeof tokens.borders): string {
  const border = tokens.borders[name];
  return `${border.width}px ${border.type}`;
}
