import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { inferInternalPackages } from "./utils.mjs";

/**
 * @param {string} projectDir
 */
export function defineConfig(projectDir) {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    experimental: {
      // Must optimize package imports for packages with barrel files
      optimizePackageImports: ["@yas/ui"],
    },
    outputFileTracing: false, // Added as a hacky workaround of a nextjs prod build error due to the font asset/resource rule added below
    webpack: (config, options) => {
      // NextJS doesn't support font files out of the box

      config.module.rules.push({
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      });

      return config;
    },
  };

  const withVanillaExtract = createVanillaExtractPlugin();

  return withVanillaExtract(nextConfig);
}
