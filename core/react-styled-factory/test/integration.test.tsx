import {
  describe,
  it,
  expect,
  render as renderRoot,
  vi,
} from "@yas/test/vitest/react";
import type { CSSProperties, ElementType } from "react";
import { createStyledFactory } from "../src/createStyledFactory";
import { recipeClassName } from "./fixtures";
import {
  blueColorRecipe,
  greenColorRecipe,
  recipeWithVariants,
} from "./test.css";

describe("can render element with", () =>
  testComponent("div", (props) => createHtml("div", props)));

describe("can render component with", () =>
  testComponent(
    (props) => <span {...props} />,
    (props) => createHtml("span", props),
  ));

describe("changing implementation", () => {
  it("can change element", () => {
    const styled = createStyledFactory();
    const Component = styled("div");
    const ComponentSpan = Component.as("span");
    const { container } = render(<ComponentSpan />);
    expect(container.outerHTML).toEqual("<span></span>");
  });

  it("can use new element props", () => {
    const styled = createStyledFactory();
    const Component = styled("div");
    const AsDialog = Component.as("dialog");
    const { container } = render(<AsDialog open />);
    expect(container.outerHTML).toEqual(`<dialog open=""></dialog>`);
  });

  it("can change component", () => {
    const styled = createStyledFactory();
    const Component = styled("div");
    function MySpan() {
      return <span />;
    }
    const ComponentMySpan = Component.as(MySpan);
    const { container } = render(<ComponentMySpan />);
    expect(container.outerHTML).toEqual("<span></span>");
  });

  it("can use new component props", () => {
    const styled = createStyledFactory();
    const Component = styled("div");
    function MySpan({ foo }: { foo: string }) {
      return <span data-testid={foo} />;
    }
    const ComponentMySpan = Component.as(MySpan);
    const { container } = render(<ComponentMySpan foo="bar" />);
    expect(container.outerHTML).toEqual(`<span data-testid="bar"></span>`);
  });

  it("old implementation is not used", () => {
    const styled = createStyledFactory();
    const Old = styled(() => {
      throw new Error("Should not be used");
    });
    const Green = styled(Old, greenColorRecipe);
    const GreenSpan = Green.as("span");
    const { container } = render(<GreenSpan />);
    expect(container.outerHTML).toEqual(
      createHtml("span", {
        attrs: { class: "green" },
      }),
    );
  });

  it("merges recipes but gets the new inner implementation", () => {
    const styled = createStyledFactory();
    const Blue = styled("div", blueColorRecipe);
    const Green = styled("span", greenColorRecipe);
    const GreenBlue = Green.as(Blue);
    const { container } = render(<GreenBlue />);
    expect(container.outerHTML).toEqual(
      createHtml("div", {
        attrs: { class: "blue green" },
      }),
    );
  });

  it("asChild uses the implementation of the child but retains props", () => {
    const styled = createStyledFactory();
    const Div = styled("div", greenColorRecipe);
    const Span = styled("span", blueColorRecipe);
    const { container } = render(
      <Span asChild data-testid="foo">
        <Div role="button" />
      </Span>,
    );
    expect(container.outerHTML).toEqual(
      createHtml("div", {
        attrs: { class: "green blue", "data-testid": "foo", role: "button" },
      }),
    );
  });
});

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

  it("sx", () => {
    const styled = createStyledFactory((style: CSSProperties) => style);
    const Component = styled(component);
    const { container } = render(<Component sx={{ color: "red" }} />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { style: `color: red;` } }),
    );
  });

  it("sx memoized", () => {
    const compile = vi.fn((style: CSSProperties) => style);
    const styled = createStyledFactory({ compile, isEqual });
    const Component = styled(component);
    const { container, rerender } = render(<Component sx={{ color: "red" }} />);
    rerender(<Component sx={{ color: "red" }} />);
    rerender(<Component sx={{ color: "blue" }} />);
    expect(compile).toHaveBeenCalledTimes(2);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { style: `color: blue;` } }),
    );
  });

  it("sx merged", () => {
    const styled = createStyledFactory((style: CSSProperties) => style);
    const Inner = styled(component).attrs({ sx: { background: "red" } });
    const Outer = styled(Inner).attrs({ sx: { color: "blue" } });
    const { container } = render(<Outer sx={{ border: "white" }} />);
    expect(container.outerHTML).toEqual(
      toHtml({
        attrs: {
          style: `background: red; color: blue; border: white;`,
        },
      }),
    );
  });

  it("sx className", () => {
    const styled = createStyledFactory((className: string) => className);
    const Component = styled(component);
    const { container } = render(<Component sx="foo" />);
    expect(container.outerHTML).toEqual(toHtml({ attrs: { class: "foo" } }));
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
    const Component = styled(component, recipeWithVariants).shouldForwardProp(
      ({ name }) => name === "foo",
    );
    const { container } = render(<Component foo={2} bar="y" />);
    expect(container.getAttribute("foo")).not.toBeNull();
    expect(container.getAttribute("bar")).toBeNull();
  });

  it("default prop", () => {
    const styled = createStyledFactory();
    const Component = styled(component).attrs({ role: "alert" });
    const { container } = render(<Component />);
    expect(container.outerHTML).toEqual(toHtml({ attrs: { role: "alert" } }));
  });

  it("default prop chained", () => {
    const styled = createStyledFactory();
    const Component = styled(component)
      .attrs({ role: "alert" })
      .attrs({ "data-testid": "foo" });
    const { container } = render(<Component />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { role: "alert", "data-testid": "foo" } }),
    );
  });

  it("default prop and inline override", () => {
    const styled = createStyledFactory();
    const Component = styled(component).attrs({ role: "default" });
    const { container } = render(<Component role="other" />);
    expect(container.outerHTML).toEqual(toHtml({ attrs: { role: "other" } }));
  });

  it("embedded style via .attrs()", () => {
    const styled = createStyledFactory();
    const Component = styled(component).attrs({ style: { width: 24 } });
    const { container } = render(<Component />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { style: "width: 24px;" } }),
    );
  });

  it("embedded style via .attrs() merges with inline style", () => {
    const styled = createStyledFactory();
    const Component = styled(component).attrs({ style: { width: 24 } });
    const { container } = render(<Component style={{ height: 12 }} />);
    expect(container.outerHTML).toEqual(
      toHtml({ attrs: { style: "width: 24px; height: 12px;" } }),
    );
  });

  it("combination of everything", () => {
    const styled = createStyledFactory((style: CSSProperties) => style);
    const Component = styled(component, recipeWithVariants).attrs({
      "data-foo": "default",
      role: "alert",
    });
    const { container } = render(
      <Component
        className="foo"
        foo={2}
        bar="y"
        sx={{ background: "red" }}
        data-foo="bar"
        style={{ color: "blue" }}
      >
        Hello
      </Component>,
    );
    expect(container.outerHTML).toEqual(
      toHtml({
        attrs: {
          class: `${recipeClassName} baz_b foo_2 bar_y foo`,
          style: "background: red; color: blue;",
          "data-foo": "bar",
          role: "alert",
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

function isEqual<A, B>(a: A, b: B): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
