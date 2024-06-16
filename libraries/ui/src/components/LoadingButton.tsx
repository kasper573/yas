import { useState, type ComponentProps, type MouseEvent } from "react";
import { Button } from "./Button";
import { CircularProgress } from "./CircularProgress";

export function LoadingButton({
  children,
  isLoading: inputIsLoading,
  disabled,
  onClick,
  size,
  ...props
}: ComponentProps<typeof Button> & { isLoading?: boolean }) {
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const isLoading = inputIsLoading ?? localIsLoading;

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!onClick) {
      return;
    }

    setLocalIsLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setLocalIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      style={isLoading ? { display: "flex" } : undefined}
      size={size}
      {...props}
    >
      {isLoading ? <CircularProgress size={size} /> : children}
    </Button>
  );
}
