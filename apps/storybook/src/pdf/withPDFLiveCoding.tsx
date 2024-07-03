import type { ReactNode } from "react";
import { useEffect } from "react";
import type { Decorator } from "@storybook/react";

/**
 * Since react-pdf doesn't support HMR, use this in your story
 * to enable full window refresh on code changes.
 */
export const withPDFLiveCoding: Decorator = (Story, context) => {
  return (
    <WithViteAutoReload>
      <Story {...context} />
    </WithViteAutoReload>
  );
};

function WithViteAutoReload({ children }: { children: ReactNode }) {
  useViteAutoReload();
  return children;
}

function useViteAutoReload() {
  useEffect(() => {
    const reload = () => {
      console.info(
        "This PDF story does not support HMR and instead has full reload enabled. Any code changes will reload the window automatically.",
      );
      window.location.reload();
    };
    import.meta.hot?.on?.("vite:afterUpdate", reload);
    return () => import.meta.hot?.off?.("vite:afterUpdate", reload);
  });
}
