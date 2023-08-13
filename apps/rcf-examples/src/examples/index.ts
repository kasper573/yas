import { lazy } from "react";
import { LayoutExample } from "./LayoutExample";
import { ConditionalExample } from "./ConditionalExample";
import { ListExample } from "./ListExample";
import { NestedExample } from "./NestedExample";
import { StepsExample } from "./StepsExample";
import { DataFormatExample } from "./DataFormatExample";
import { RemoteExample } from "./RemoteExample";

export const examples = [
  { name: "Layout", component: LayoutExample },
  { name: "DataFormat", component: DataFormatExample },
  { name: "Conditional", component: ConditionalExample },
  { name: "Steps", component: StepsExample },
  { name: "List", component: ListExample },
  { name: "Nested", component: NestedExample },
  { name: "Remote", component: RemoteExample },
  {
    name: "Filter",
    component: lazy(() =>
      import("./FilterExample").then((m) => ({ default: m.FilterExample })),
    ),
  },
];
