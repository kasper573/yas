import {
  PopoverAnchor,
  TextField,
  Popover,
  PopoverContent,
  Paper,
  useForm,
  createControllerProxy,
  useFormChanges,
} from "@yas/ui";
import { type ReactNode } from "react";

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
  const form = useForm<{ search?: string }>();
  const control = createControllerProxy(form.control);
  useFormChanges(form, ({ search }) => onChange?.(search));
  const clear = () => form.reset();

  return (
    <form onSubmit={form.handleSubmit(() => {})}>
      <Popover open={value !== undefined}>
        <PopoverAnchor>
          {control.search$((props) => (
            <TextField
              {...props}
              size="small"
              inputProps={{ placeholder: "Search..." }}
              isLoading={isLoading}
              clearable
            />
          ))}
        </PopoverAnchor>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onFocusOutside={clear}
          onInteractOutside={clear}
          style={{ overflow: "hidden" }}
          onClick={clear}
        >
          <Paper>{children}</Paper>
        </PopoverContent>
      </Popover>
    </form>
  );
}
