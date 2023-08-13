import { z } from "zod";
import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BaseForm } from "../BaseForm";
import { RadioGroupField } from "../fields/RadioGroupField";
import { ExampleContent } from "../ExampleContent";
import { AccordionGroup } from "../components/AccordionGroup";
import { FieldGroup } from "../components/FieldGroup";
import {
  manufacturerType,
  priceReductionType,
  fetchManufacturers,
} from "../api/fakeApiSdk";
import { CheckboxGroupField } from "../fields/CheckboxGroupField";

const FilterForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        priceReduction: priceReductionType,
        manufacturer: manufacturerType.shape.id.array(),
      }),
    )
    .type(priceReductionType, RadioGroupField, {
      options: priceReductionType.options.map((value) => ({
        value,
        label: value,
      })),
    })
    .type(manufacturerType.shape.id.array(), (props) => {
      const { data = [] } = useQuery("manufacturers", fetchManufacturers);
      return (
        <CheckboxGroupField
          options={data.map((m) => ({ value: m.id, label: m.name }))}
          {...props}
        />
      );
    })
    .layout(({ fields }) => (
      <>
        <AccordionGroup
          defaultExpanded
          entries={{
            Main: (
              <FieldGroup>
                {Object.values(fields).map((Component, index) => (
                  <Component key={index} />
                ))}
              </FieldGroup>
            ),
          }}
        />
      </>
    )),
);

export function FilterExample() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const [filter, setFilter] = useState<inferFormValue<typeof FilterForm>>();
  return (
    <QueryClientProvider client={queryClient}>
      <ExampleContent
        menu={
          <>
            <Typography>Form data</Typography>
            <pre>{JSON.stringify(filter ?? {}, null, 2)}</pre>
          </>
        }
      >
        {(props) => (
          <FilterForm value={filter} onChange={setFilter} {...props} />
        )}
      </ExampleContent>
    </QueryClientProvider>
  );
}
