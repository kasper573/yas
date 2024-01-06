import { PopoverAnchor, TextField, Popover, PopoverContent } from "@yas/ui";
import type { ReactNode } from "react";

export function SearchForm({
  value,
  isLoading,
  onChange,
  children,
}: {
  value?: string;
  onChange?: (value?: string) => void;
  isLoading?: boolean;
  children?: ReactNode;
}) {
  function clear() {
    onChange?.(undefined);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clear();
      }}
    >
      <Popover open={value !== undefined}>
        <PopoverAnchor>
          <TextField
            size="small"
            value={value}
            onChange={onChange}
            inputProps={{ placeholder: "Search..." }}
            isLoading={isLoading}
            clearable
          />
        </PopoverAnchor>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onFocusOutside={clear}
        >
          {children}
        </PopoverContent>
      </Popover>
    </form>
  );
}
