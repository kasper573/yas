import type { ComponentProps } from "react";
import { range } from "@yas/fn";
import { useMemo } from "react";
import { SingleSelectField } from "../fields/SingleSelectField";

export interface PaginationProps
  extends Omit<
    ComponentProps<typeof SingleSelectField>,
    "value" | "options" | "onChange" | "children"
  > {
  totalPages: number;
  currentPage: number;
  onChange: (newPage: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  onChange,
  ...rest
}: PaginationProps) {
  const options = useMemo(
    () => range(1, totalPages).map((value) => ({ value, label: value })),
    [totalPages],
  );
  return (
    <SingleSelectField
      required
      options={options}
      value={currentPage}
      onChange={(value) => value !== undefined && onChange(value)}
      {...rest}
    />
  );
}
