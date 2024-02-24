import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";

/**
 * This exists purely for architectural reasons.
 * It makes it impossible to accidentally use the wrong Link component,
 * and promotes creating a styled link component in the ui package and using only that.
 */
export function createLinkComponent(
  enhance: (component: typeof Link) => ComponentType,
): typeof Link {
  return enhance(Link) as typeof Link;
}
