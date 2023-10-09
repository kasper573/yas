import type { Preview } from "@storybook/react";
import dark from "@yas/css/themes/dark.css";
import light from "@yas/css/themes/light.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    themes: {
      default: "light",
      list: [
        { name: "dark", class: dark },
        { name: "light", class: light },
      ],
    },
  },
};

export default preview;
