import { defineConfig } from "@yas/build/nextjs.mjs";

export default defineConfig(new URL(".", import.meta.url).pathname);
