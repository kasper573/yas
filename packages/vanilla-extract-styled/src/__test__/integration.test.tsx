import { render } from "@testing-library/react";
import type { ElementType } from "react";
import { createStyledFactory } from "../index";
import { recipeClassName } from "./fixtures";
import { recipeWithVariants, sprinkles } from "./test.css";

describe("can render element with", () =>
  testComponent("div", (props) => createHtml("div", props)));

describe("can render component with", () =>
  testComponent(
    (props) => <span {...props} />,
    (props) => createHtml("span", props),
  ));

function testComponent(
  component: ElementType,
  toHtml: (props?: HtmlProps) => void,
) {
  it("nothing", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component />);
    expect(container.innerHTML).toEqual(toHtml());
  });

  it("children", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component>Hello</Component>);
    expect(container.innerHTML).toEqual(toHtml({ content: "Hello" }));
  });

  it("prop", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component data-foo="bar">Hello</Component>);
    expect(container.innerHTML).toEqual(
      toHtml({ attrs: { "data-foo": "bar" }, content: "Hello" }),
    );
  });

  it("className", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component className="foo">Hello</Component>);
    expect(container.innerHTML).toEqual(
      toHtml({ attrs: { class: "foo" }, content: "Hello" }),
    );
  });

  it("inline style object", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component style={{ color: "red" }} />);
    expect(container.innerHTML).toEqual(
      toHtml({ attrs: { style: `color: red;` } }),
    );
  });

  it("sprinkles", () => {
    const styled = createStyledFactory(sprinkles);
    const Component = styled(component);
    const { container } = render(<Component sx={{ color: "red" }} />);
    expect(container.innerHTML).toEqual(
      toHtml({ attrs: { class: "color_red" } }),
    );
  });

  it("variants", () => {
    const styled = createStyledFactory();
    const Component = styled(component, recipeWithVariants);
    const { container } = render(<Component foo={2} bar="y" />);
    expect(container.innerHTML).toEqual(
      toHtml({ attrs: { class: `${recipeClassName} baz_b foo_2 bar_y` } }),
    );
  });

  it("default prop", () => {
    const styled = createStyledFactory();
    const Component = styled(component, undefined, { role: "alert" });
    const { container } = render(<Component />);
    expect(container.innerHTML).toEqual(toHtml({ attrs: { role: "alert" } }));
  });

  it("default prop and inline override", () => {
    const styled = createStyledFactory();
    const Component = styled(component, undefined, { role: "default" });
    const { container } = render(<Component role="other" />);
    expect(container.innerHTML).toEqual(toHtml({ attrs: { role: "other" } }));
  });

  it("combination of everything", () => {
    const styled = createStyledFactory(sprinkles);
    const Component = styled(component, recipeWithVariants, {
      "data-foo": "default",
      role: "alert",
    });
    const { container } = render(
      <Component
        className="foo"
        foo={2}
        bar="y"
        sx={{ color: "red" }}
        data-foo="bar"
        style={{ color: "blue" }}
      >
        Hello
      </Component>,
    );
    expect(container.innerHTML).toEqual(
      toHtml({
        attrs: {
          class: `${recipeClassName} baz_b foo_2 bar_y color_red foo`,
          "data-foo": "bar",
          role: "alert",
          style: "color: blue;",
        },
        content: "Hello",
      }),
    );
  });
}

function createHtml(
  elementName: string,
  { attrs = {}, content = "" }: HtmlProps = {},
) {
  const attrEntries = Object.entries(attrs);
  const attrStrings = attrEntries.map(([key, value]) => `${key}="${value}"`);
  return `<${[elementName, ...attrStrings].join(
    " ",
  )}>${content}</${elementName}>`;
}

type HtmlProps = {
  attrs?: Record<string, unknown>;
  content?: string;
};
