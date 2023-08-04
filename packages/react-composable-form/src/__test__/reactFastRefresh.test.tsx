/* eslint-disable @typescript-eslint/no-var-requires,import/order,no-var */
import "@testing-library/jest-dom";
import type { ComponentType } from "react";
import React from "react";
import ReactFreshRuntime from "react-refresh/runtime";
import type { Root } from "react-dom/client";

// React refresh runtime must inject global hook before
// importing react-dom/client and react-dom/test-utils
ReactFreshRuntime.injectIntoGlobalHook(window);
import ReactDOMClient = require("react-dom/client");
const { act } = require("react-dom/test-utils");

describe("reactFastRefresh", () => {
  let container: HTMLDivElement, reactRoot: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    reactRoot = ReactDOMClient.createRoot(container);
  });

  afterEach(() => {
    delete global.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    document.body.removeChild(container);
  });

  let idCounter = 0;
  function prepare(Original: ComponentType) {
    const id = (idCounter++).toString();
    act(() => reactRoot.render(<Original />));
    ReactFreshRuntime.register(Original, id);
    function patch(Updated: ComponentType) {
      ReactFreshRuntime.register(Updated, id);
      act(() => ReactFreshRuntime.performReactRefresh());
    }
    return { patch };
  }

  it("can preserve state for compatible types", () => {
    const { patch } = prepare(function Hello() {
      const [val, setVal] = React.useState(0);
      return (
        <p style={{ color: "blue" }} onClick={() => setVal(val + 1)}>
          {val}
        </p>
      );
    });

    // Bump the state before patching.
    const el = container.firstChild as HTMLParagraphElement;
    expect(el.textContent).toBe("0");
    expect(el.style.color).toBe("blue");
    act(() => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(el.textContent).toBe("1");

    // Perform a hot update.
    patch(function Hello() {
      const [val, setVal] = React.useState(0);
      return (
        <p style={{ color: "red" }} onClick={() => setVal(val + 1)}>
          {val}
        </p>
      );
    });

    // Assert the state was preserved but color changed.
    expect(container.firstChild).toBe(el);
    expect(el.textContent).toBe("1");
    expect(el.style.color).toBe("red");
  });
});

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
  var __REACT_DEVTOOLS_GLOBAL_HOOK__: unknown;
}
