import { test, expect } from "@playwright/experimental-ct-react";
import { VanillaExtract } from "./components";
import { colors } from "./tokens";

test.use({ viewport: { width: 500, height: 500 } });

test("can define valid value", async ({ mount }) => {
  const component = await mount(<VanillaExtract className="validRedColor" />);
  await expect(component).toHaveCSS("color", colors.red);
});

test("can define valid aliased value", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="validAliasedRedBackground" />,
  );
  await expect(component).toHaveCSS("background-color", colors.red);
});

test("conditional value uses default when condition is inactive", async ({
  mount,
}) => {
  const component = await mount(
    <VanillaExtract className="conditionalRedColor" />,
  );
  await expect(component).toHaveCSS("color", colors.blue);
});

test("conditional value is correct when condition is active", async ({
  mount,
}) => {
  const component = await mount(
    <VanillaExtract className="conditionalRedColor" data-condition />,
  );
  await expect(component).toHaveCSS("color", colors.red);
});

test("can define multiple properties", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="validRedColorAndGreenBackground" />,
  );
  await expect(component).toHaveCSS("color", colors.red);
  await expect(component).toHaveCSS("background-color", colors.green);
});

test("defining multiple properties yield a single class name", async ({
  mount,
}) => {
  const component = await mount(
    <VanillaExtract className="validRedColorAndGreenBackground" />,
  );
  const classListSize = await component.evaluate(
    (node) => node.classList.length,
  );
  expect(classListSize).toBe(1);
});