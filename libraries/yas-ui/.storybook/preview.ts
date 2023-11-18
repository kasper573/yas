import type { Preview, ReactRenderer } from "@storybook/react";
import { dark } from "@yas/css/themes/dark.css";
import { light } from "@yas/css/themes/light.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { clsx } from "@yas/css";
import { pageContainer } from "./storybook.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
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
  ],
};

export default preview;
