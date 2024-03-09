import { test, expect } from "@yas/test/playwright/index.ts";

test("can see the home page title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/yet another stack/i)).toBeVisible();
});

test.describe("api tester", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Api Tester" }).click();
  });

  test.describe("trpc", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "TRPC" }).click();
    });

    testApi();
  });

  test.describe("graphql", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "GraphQL" }).click();
    });

    testApi();
  });
});

function testApi() {
  test("can query", async ({ page }) => {
    await page.getByPlaceholder(/type your name/i).fill("Playwright");
    await expect(page.getByText("Hello, Playwright!")).toBeVisible();
  });

  test("can mutate", async ({ page }) => {
    await page.getByLabel(/increase amount/i).fill("5");
    await page.getByRole("button", { name: /increase count/i }).click();
    await expect(page.getByText(`"count": 5`)).toBeVisible();
  });
}
