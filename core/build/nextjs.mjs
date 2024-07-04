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
  };

  const withVanillaExtract = createVanillaExtractPlugin();

  return withVanillaExtract(nextConfig);
}
