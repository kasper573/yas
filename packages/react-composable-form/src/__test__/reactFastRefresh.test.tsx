/* eslint-disable @typescript-eslint/no-var-requires,import/order,no-var */
import "@testing-library/jest-dom";
import type { ComponentProps, ComponentType } from "react";
import { z } from "zod";
import { useState } from "react";
import RefreshRuntime from "react-refresh/runtime";
import type { RCFGenerics } from "../types/optionTypes";
import userEvent from "@testing-library/user-event";
import type { FormComponent } from "../createForm";
import { createForm } from "../createForm";

// React refresh runtime must inject global hook before testing-library
RefreshRuntime.injectIntoGlobalHook(window);
import rtl = require("@testing-library/react");
const { act, render } = rtl;

describe("reactFastRefresh", () => {
  function createTestForm() {
    return createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ name, value, onChange }) => (
          <input
            aria-label={name}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
          />
        ))
        .layout(({ fields, title }) => (
          <>
            <h1>{title}</h1>
            {Object.values(fields).map((Field, index) => (
              <Field key={index} />
            ))}
          </>
        )),
    );
  }

  async function testForm(createFormVersion: () => FormComponent<RCFGenerics>) {
    const FormV1 = createFormVersion();
    const { getByRole, patch } = prepare(FormV1, { title: "V1" });

    expect(getByRole("heading")).toHaveTextContent("V1");
    await userEvent.type(getByRole("textbox"), "hello");

    const FormV2 = createFormVersion();
    await patch(FormV2, { title: "V2" });

    expect(getByRole("heading")).toHaveTextContent("V2");
    expect(getByRole("textbox")).toHaveValue("hello");
  }

  it("controlled + same form component instance", async () => {
    const instance = withControlledState(createTestForm());
    await testForm(() => instance);
  });

  it("controlled + new form component instance", async () => {
    await testForm(() => withControlledState(createTestForm()));
  });

  it("uncontrolled + same form component instance", async () => {
    const instance = createTestForm();
    await testForm(() => instance);
  });

  it("uncontrolled + new form component instance", async () => {
    await testForm(createTestForm);
  });
});

function withControlledState<C extends ComponentType>(Component: C) {
  return function ControlledComponent<Value>(props: ComponentProps<C>) {
    const [value, onChange] = useState<Value>();
    return <Component {...({ value, onChange, ...props } as any)} />;
  } as C;
}

let idCounter = 0;
function prepare<Props extends Record<string, unknown>>(
  Original: ComponentType<Props>,
  props: Partial<Props> = {},
) {
  const id = (idCounter++).toString();
  const OriginalWithProps = wrapAndRegister(Original, props, id);
  const result = render(<OriginalWithProps />);
  async function patch(
    Updated: ComponentType<Props>,
    props: Partial<Props> = {},
  ) {
    wrapAndRegister(Updated, props, id);
    await act(() => RefreshRuntime.performReactRefresh());
  }
  return { ...result, patch };
}

function wrapAndRegister<Props extends Record<string, unknown>>(
  Inner: ComponentType<Props>,
  props: Partial<Props>,
  id = (idCounter++).toString(),
) {
  function Outer() {
    return <Inner {...(props as Props)} />;
  }
  RefreshRuntime.register(Outer, id + "_outer");
  RefreshRuntime.register(Inner, id + "_inner");
  return Outer;
}
