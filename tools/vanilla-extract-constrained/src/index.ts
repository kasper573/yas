import { createSprinkles } from "@vanilla-extract/sprinkles";

export function createConstrained(...args: Parameters<typeof createSprinkles>) {
  return createSprinkles(...args);
}

export { defineProperties } from "@vanilla-extract/sprinkles";
