import type { ComponentProps, ComponentType, ReactNode } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export interface AccordionByGroupsProps
  extends Omit<ComponentProps<typeof Accordion>, "children"> {
  entries?: Record<string, ReactNode>;
  components?: {
    Summary?: ComponentType<{ children?: ReactNode }>;
  };
}

export function AccordionGroup({
  entries = {},
  components: { Summary = PassThrough } = {},
  ...accordionProps
}: AccordionByGroupsProps) {
  return (
    <>
      {Object.entries(entries).flatMap(([title, content]) => (
        <Accordion key={title} {...accordionProps}>
          <AccordionSummary>
            <Summary>{title}</Summary>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>{content}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

function PassThrough({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
