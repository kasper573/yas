import { expect, test } from "@playwright/experimental-ct-react";
import { FormWithRequiredField } from "./required";
import { FormWithOptionalField } from "./optional";

test.use({ viewport: { width: 500, height: 500 } });

test("invalid input yields error", async ({ mount }) => {
  const component = await mount(<FormWithRequiredField />);
  await component.getByLabel("Name").fill("Invalid");
  await expect(component.getByText("Error")).toBeVisible();
});

test("valid input yields no error", async ({ mount }) => {
  const component = await mount(<FormWithRequiredField />);
  await component.getByLabel("Name").fill("Correct");
  await expect(component.getByText("Error")).not.toBeVisible();
});

test("valid form data can be submitted", async ({ mount }) => {
  const component = await mount(<FormWithRequiredField />);
  await component.getByLabel("Name").fill("Correct");
  await component.getByText("Submit").click();
  await expect(component.getByTestId("form-values")).toHaveText(
    JSON.stringify({ name: "Correct" }),
  );
});

test("optional field can be cleared and not yield an error", async ({
  mount,
}) => {
  const component = await mount(<FormWithOptionalField />);
  await component.getByLabel("Name").clear();
  await expect(component.getByText("Error")).not.toBeVisible();
});
