import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { inferInternalPackages } from "./utils.mjs";

/**
 * @param {string} projectDir
 */
export function defineConfig(projectDir) {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    experimental: {
      optimizePackageImports: inferInternalPackages(projectDir),
    },
  };

  const withVanillaExtract = createVanillaExtractPlugin();

  return withVanillaExtract(nextConfig);
}
