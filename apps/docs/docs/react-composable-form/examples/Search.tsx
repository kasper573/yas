import type { ComponentProps } from "react";
import { Children, Fragment, useMemo, useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  RangeField,
  RadioGroupField,
  CheckboxGroupField,
  BaseForm,
  Pagination,
  Stack,
  Divider,
  Box,
} from "@yas/ui";
import { ExampleContent } from "../../../src/components/ExampleContent";
import type { SearchResultMetrics } from "./Search.api";
import {
  manufacturerType,
  discountType,
  fetchPriceRange,
  resolutionType,
  priceType,
  fetchManufacturers,
  fetchResolutions,
  screenSizeType,
  fetchScreenSizeRange,
  search,
  filterType,
} from "./Search.api";

const FilterForm = BaseForm.extend((options) =>
  options
    .schema(filterType)
    .type(priceType, (props) => {
      const { data } = useQuery("price-range", fetchPriceRange);
      return <RangeField {...props} min={data?.[0]} max={data?.[1]} />;
    })
    .type(discountType, RadioGroupField, {
      options: discountType.options.map((value) => ({
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
    .type(resolutionType.shape.id.array(), (props) => {
      const { data = [] } = useQuery("resolutions", fetchResolutions);
      return (
        <CheckboxGroupField
          options={data.map((m) => ({ value: m.id, label: m.name }))}
          {...props}
        />
      );
    })
    .type(screenSizeType, (props) => {
      const { data } = useQuery("screen-size-range", fetchScreenSizeRange);
      return <RangeField {...props} min={data?.[0]} max={data?.[1]} />;
    })
    .layout<{ metrics?: SearchResultMetrics }>(({ fields, metrics = {} }) => (
      <FieldGroup>
        {Object.entries(fields).map(([componentName, Component]) => (
          <Component key={componentName} metrics={metrics[componentName]} />
        ))}
      </FieldGroup>
    )),
);

function SearchPage() {
  const [filter, setFilter] = useState<inferFormValue<typeof FilterForm>>();
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const query = useMemo(() => ({ filter, pagination }), [filter, pagination]);
  const queryKey = useMemo(() => ["search", JSON.stringify(query)], [query]);
  const { data: response } = useQuery({
    queryKey,
    queryFn: () => search(query),
  });

  return (
    <ExampleContent
      menu={(props) => (
        <FilterForm
          value={filter}
          onChange={setFilter}
          metrics={response?.metrics}
          {...props}
        />
      )}
    >
      <pre>{JSON.stringify(response?.entries, null, 2)}</pre>

      <Pagination
        totalPages={response?.total ?? 0}
        currentPage={pagination.page}
        onChange={(page) => setPagination({ ...pagination, page })}
      />
    </ExampleContent>
  );
}

export default function SearchExample() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
}

function FieldGroup({ children, ...props }: ComponentProps<typeof Stack>) {
  return (
    <Stack gap={2} {...props}>
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {index > 0 && <Divider />}
          <Box sx={{ px: 2 }}>{child}</Box>
        </Fragment>
      ))}
    </Stack>
  );
}
