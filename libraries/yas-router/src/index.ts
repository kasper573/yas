import { createEnhancedRouteClass } from "./createRouteComponent";

export * from "@tanstack/react-router";
export * from "./useRouteState";
export type * from "./createRouteComponent";

export const Route = createEnhancedRouteClass();
