import { test, expect } from "@playwright/experimental-ct-react";
import { Container, VanillaExtract } from "./components";
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

test("can define valid shorthand value", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="validShorthandRedColor" />,
  );
  await expect(component).toHaveCSS("color", colors.red);
});

test("can define valid aliased shorthand value", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="validAliasedShorthandRedBackground" />,
  );
  await expect(component).toHaveCSS("background-color", colors.red);
});

test("can define multiple properties", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="validRedColorAndGreenBackground" />,
  );
  await expect(component).toHaveCSS("color", colors.red);
  await expect(component).toHaveCSS("background-color", colors.green);
});

test("can define unconstrained value", async ({ mount }) => {
  const component = await mount(
    <VanillaExtract className="unconstrainedFontSize42px" />,
  );
  await expect(component).toHaveCSS("font-size", "42px");
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

test.describe("conditional", () => {
  test.describe("inline", () => {
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
  });

  test.describe("root", () => {
    test("layer", async ({ mount }) => {
      const component = await mount(
        <VanillaExtract className="layerRedColor" />,
      );
      await expect(component).toHaveCSS("color", colors.red);
    });

    test("container", async ({ mount }) => {
      const root = await mount(
        <Container>
          <VanillaExtract className="containerRedColor" data-testid="inner" />,
        </Container>,
      );
      const inner = root.getByTestId("inner");
      await expect(inner).toHaveCSS("color", colors.red);
    });

    test("media", async ({ mount }) => {
      const component = await mount(
        <VanillaExtract className="mediaRedColor" />,
      );
      await expect(component).toHaveCSS("color", colors.red);
    });

    test("supports", async ({ mount }) => {
      const component = await mount(
        <VanillaExtract className="supportsRedColor" />,
      );
      await expect(component).toHaveCSS("color", colors.red);
    });

    test("selector", async ({ mount }) => {
      const component = await mount(
        <VanillaExtract
          className="fooSelectorRedColor"
          unsafeClassName="foo"
        />,
      );
      await expect(component).toHaveCSS("color", colors.red);
    });
  });
});
