import { PopoverAnchor, TextField, Popover, PopoverContent } from "@yas/ui";
import { useState } from "react";
import type { ReactNode } from "react";

export function SearchForm({
  isLoading,
  onSubmit,
  children,
}: {
  isLoading?: boolean;
  onSubmit?: (value?: string) => void;
  children?: ReactNode;
}) {
  const [input, setInput] = useState<string | undefined>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(input);
        setInput(undefined);
      }}
    >
      <Popover open={input !== undefined}>
        <PopoverAnchor>
          <TextField
            size="small"
            value={input}
            onChange={setInput}
            inputProps={{ placeholder: "Search..." }}
            isLoading={isLoading}
            clearable
          />
        </PopoverAnchor>
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          {children}
        </PopoverContent>
      </Popover>
    </form>
  );
}
