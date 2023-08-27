import { lazy } from "react";

export const examples = [
  {
    name: "Layout",
    component: lazy(() =>
      import("./LayoutExample").then((m) => ({ default: m.LayoutExample })),
    ),
  },
  {
    name: "DataFormat",
    component: lazy(() =>
      import("./DataFormatExample").then((m) => ({
        default: m.DataFormatExample,
      })),
    ),
  },
  {
    name: "Conditional",
    component: lazy(() =>
      import("./ConditionalExample").then((m) => ({
        default: m.ConditionalExample,
      })),
    ),
  },
  {
    name: "Steps",
    component: lazy(() =>
      import("./StepsExample").then((m) => ({ default: m.StepsExample })),
    ),
  },
  {
    name: "List",
    component: lazy(() =>
      import("./ListExample").then((m) => ({ default: m.ListExample })),
    ),
  },
  {
    name: "Nested",
    component: lazy(() =>
      import("./NestedExample").then((m) => ({ default: m.NestedExample })),
    ),
  },
  {
    name: "Remote",
    component: lazy(() =>
      import("./RemoteExample").then((m) => ({ default: m.RemoteExample })),
    ),
  },
  {
    name: "Filter",
    component: lazy(() =>
      import("./FilterExample").then((m) => ({ default: m.FilterExample })),
    ),
  },
  {
    name: "Checkout",
    component: lazy(() =>
      import("./CheckoutExample").then((m) => ({ default: m.CheckoutExample })),
    ),
  },
  {
    name: "Property Explorer",
    component: lazy(() =>
      import("./PropertyExplorerExample").then((m) => ({
        default: m.PropertyExplorerExample,
      })),
    ),
  },
];
