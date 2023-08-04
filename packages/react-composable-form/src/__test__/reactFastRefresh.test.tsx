/* eslint-disable @typescript-eslint/no-var-requires,import/order,no-var */
import "@testing-library/jest-dom";
import type { ComponentType } from "react";
import RefreshRuntime from "react-refresh/runtime";
import userEvent from "@testing-library/user-event";
import type { FormComponent } from "../createForm";
import { createForm } from "../createForm";
import { z } from "zod";

// React refresh runtime must inject global hook before
// importing react-dom/client and react-dom/test-utils
RefreshRuntime.injectIntoGlobalHook(window);
import rtl = require("@testing-library/react");
import type { RCFGenerics } from "../types/optionTypes";
import { useState } from "react";
const { act, render } = rtl;

describe("reactFastRefresh", () => {
  it("controlled + same form component instance", async () => {
    const instance = createTestForm();
    await testForm(() => instance, useControlledProps);
  });

  it("controlled + new form component instance", async () => {
    await testForm(createTestForm, useControlledProps);
  });

  it("uncontrolled + same form component instance", async () => {
    const instance = createTestForm();
    await testForm(() => instance);
  });

  it("uncontrolled + new form component instance", async () => {
    await testForm(createTestForm);
  });
});

function useControlledProps() {
  const [value, onChange] = useState();
  return { value, onChange };
}

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

async function testForm(
  createFormVersion: () => FormComponent<RCFGenerics>,
  useProps: () => Record<string, unknown> = () => ({}),
) {
  const FormV1 = createFormVersion();
  const { getByRole, patch } = prepare(function AppV1() {
    return <FormV1 {...useProps()} title="V1" />;
  });

  expect(getByRole("heading")).toHaveTextContent("V1");
  await userEvent.type(getByRole("textbox"), "hello");

  const FormV2 = createFormVersion();
  await patch(function AppV2() {
    return <FormV2 {...useProps()} title="V2" />;
  });

  expect(getByRole("heading")).toHaveTextContent("V2");
  expect(getByRole("textbox")).toHaveValue("hello");
}

let idCounter = 0;
function prepare(Original: ComponentType) {
  const id = (idCounter++).toString();
  const result = render(<Original />);
  RefreshRuntime.register(Original, id);
  async function patch(Updated: ComponentType) {
    RefreshRuntime.register(Updated, id);
    await act(() => RefreshRuntime.performReactRefresh());
  }
  return { ...result, patch };
}
