/* eslint-disable @typescript-eslint/no-var-requires,import/order,no-var */
import "@testing-library/jest-dom";
import type { ComponentType } from "react";
import React from "react";
import ReactFreshRuntime from "react-refresh/runtime";
import userEvent from "@testing-library/user-event";

// React refresh runtime must inject global hook before
// importing react-dom/client and react-dom/test-utils
ReactFreshRuntime.injectIntoGlobalHook(window);
import rtl = require("@testing-library/react");
const { act, render } = rtl;

describe("reactFastRefresh", () => {
  it("can preserve state for compatible types", async () => {
    const { getByRole, patch } = prepare(function Hello() {
      const [val, setVal] = React.useState(0);
      return (
        <button style={{ color: "blue" }} onClick={() => setVal(val + 1)}>
          {val}
        </button>
      );
    });

    // Bump the state before patching.
    let button = getByRole("button");
    expect(button).toHaveTextContent("0");
    expect(button).toHaveStyle({ color: "blue" });
    await userEvent.click(button);
    expect(button).toHaveTextContent("1");

    // Perform a hot update.
    await patch(function Hello() {
      const [val, setVal] = React.useState(0);
      return (
        <button style={{ color: "red" }} onClick={() => setVal(val + 1)}>
          {val}
        </button>
      );
    });

    // Assert the state was preserved but color changed.
    button = getByRole("button");
    expect(button).toHaveTextContent("1");
    expect(button).toHaveStyle({ color: "red" });
  });
});

let idCounter = 0;
function prepare(Original: ComponentType) {
  const id = (idCounter++).toString();
  const result = render(<Original />);
  ReactFreshRuntime.register(Original, id);
  async function patch(Updated: ComponentType) {
    ReactFreshRuntime.register(Updated, id);
    await act(() => ReactFreshRuntime.performReactRefresh());
  }
  return { ...result, patch };
}
