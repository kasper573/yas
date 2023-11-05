import { createYasViteConfig } from "@yas/build/vite";

export default createYasViteConfig(process.cwd(), {
  // It's not particularly interesting to analyze the storybook build,
  // since it is polluted with storybook's own code.
  analyze: false,
});
