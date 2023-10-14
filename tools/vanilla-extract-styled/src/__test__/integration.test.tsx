import { render as renderRoot } from "@testing-library/react";
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
    expect(container.outerHTML).toEqual(toHtml());
  });

  it("children", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component>Hello</Component>);
    expect(container.outerHTML).toEqual(toHtml({ content: "Hello" }));
  });

  it("prop", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component data-foo="bar">Hello</Component>);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { "data-foo": "bar" }, content: "Hello" }),
    );
  });

  it("className", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component className="foo">Hello</Component>);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { class: "foo" }, content: "Hello" }),
    );
  });

  it("inline style object", () => {
    const styled = createStyledFactory();
    const Component = styled(component);
    const { container } = render(<Component style={{ color: "red" }} />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { style: `color: red;` } }),
    );
  });

  it("sprinkles", () => {
    const styled = createStyledFactory(sprinkles);
    const Component = styled(component);
    const { container } = render(<Component sx={{ color: "red" }} />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { class: "color_red" } }),
    );
  });

  it("variants", () => {
    const styled = createStyledFactory();
    const Component = styled(component, recipeWithVariants);
    const { container } = render(<Component foo={2} bar="y" />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { class: `${recipeClassName} baz_b foo_2 bar_y` } }),
    );
  });

  it("variant props and not forward by default", () => {
    const styled = createStyledFactory();
    const Component = styled(component, recipeWithVariants);
    const { container } = render(<Component foo={2} bar="y" />);
    expect(container.getAttribute("foo")).toBeNull();
    expect(container.getAttribute("bar")).toBeNull();
  });

  it("non-variant props and forward by default", () => {
    const styled = createStyledFactory();
    const Component = styled(component, recipeWithVariants);
    const { container } = render(<Component data-a={1} data-b={2} />);
    expect(container.getAttribute("data-a")).not.toBeNull();
    expect(container.getAttribute("data-b")).not.toBeNull();
  });

  it("props while customizing which props should be forwarded", () => {
    const styled = createStyledFactory();
    const Component = styled(component, recipeWithVariants).forwardProps(
      ({ name }) => name === "foo",
    );
    const { container } = render(<Component foo={2} bar="y" />);
    expect(container.getAttribute("foo")).not.toBeNull();
    expect(container.getAttribute("bar")).toBeNull();
  });

  it("default prop", () => {
    const styled = createStyledFactory();
    const Component = styled(component).defaultProps({ role: "alert" });
    const { container } = render(<Component />);
    expect(container.outerHTML).toEqual(toHtml({ attrs: { role: "alert" } }));
  });

  it("default prop and inline override", () => {
    const styled = createStyledFactory();
    const Component = styled(component).defaultProps({ role: "default" });
    const { container } = render(<Component role="other" />);
    expect(container.outerHTML).toEqual(toHtml({ attrs: { role: "other" } }));
  });

  it("combination of everything", () => {
    const styled = createStyledFactory(sprinkles);
    const Component = styled(component, recipeWithVariants).defaultProps({
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
    expect(container.outerHTML).toEqual(
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

function render(...args: Parameters<typeof renderRoot>) {
  const { container, ...rest } = renderRoot(...args);
  const { firstElementChild } = container;
  if (!firstElementChild) {
    throw new Error("No first element child");
  }
  return {
    container: firstElementChild,
    ...rest,
  };
}
