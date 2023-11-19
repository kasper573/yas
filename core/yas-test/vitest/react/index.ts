export * from "@testing-library/react";
export * from "@testing-library/user-event";
export * from "vitest";

// Setup
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
