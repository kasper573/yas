import { tokens } from "@yas/design-tokens";

export function cssForShadow(name: keyof tokens.Shadow): string {
  return Object.values(tokens.shadow[name])
    .map(({ color, radius, spread, offset: { x, y } }) => {
      return `${x}px ${y}px ${radius}px ${spread}px ${color}`;
    })
    .join(", ");
}
