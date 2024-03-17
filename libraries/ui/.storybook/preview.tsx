import type { Preview, ReactRenderer } from "@storybook/react";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { clsx } from "@yas/style";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { ModalContext, ModalOutlet, ModalStore } from "react-async-modal-hook";
import { pageContainer } from "./preview.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: ["sx", "asChild", "children"],
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: "dark",
      themes: {
        light: clsx(light, pageContainer),
        dark: clsx(dark, pageContainer),
      },
    }),
    (Story) => (
      <WithModalContext>
        <Story />
      </WithModalContext>
    ),
  ],
};

function WithModalContext({ children }: { children: ReactNode }) {
  const store = useMemo(() => new ModalStore(), []);
  return (
    <ModalContext.Provider value={store}>
      {children}
      <ModalOutlet />
    </ModalContext.Provider>
  );
}

export default preview;
