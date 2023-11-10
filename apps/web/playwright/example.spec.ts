import { test, expect } from "@yas/test/playwright";

test.describe("Example", () => {
  test("Playwright can visit the app", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/hello world/i)).toBeVisible();
  });
});
