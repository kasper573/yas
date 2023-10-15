import type { Preview, ReactRenderer } from "@storybook/react";
import dark from "@yas/css/themes/dark.css";
import light from "@yas/css/themes/light.css";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: "light",
      themes: { light, dark },
    }),
  ],
};

export default preview;
