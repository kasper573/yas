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
    await page.getByLabel(/enter your name/i).fill("Playwright");
    await expect(page.getByLabel(/greeting from server/i)).toHaveValue(
      "Hello, Playwright!",
    );
  });

  test("can mutate", async ({ page }) => {
    const count = page.getByLabel(/count from server/i);
    await expect(count).toHaveValue("0");
    await page.getByRole("button", { name: /increase count/i }).click();
    await expect(count).toHaveValue("1");
  });
}
