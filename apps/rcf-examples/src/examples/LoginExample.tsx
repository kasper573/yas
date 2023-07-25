import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { BaseForm } from "../forms/BaseForm";
import { SingleSelectField, valueOptions } from "../fields/SelectField";

const categoryType = z.enum(["foo", "bar", "baz"]);
const category2Type = z.enum(["hello", "world"]);

const UserForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        age: z.number(),
        category: categoryType,
        category2: category2Type,
      }),
    )
    .type(categoryType, SingleSelectField, {
      options: valueOptions(categoryType.options),
    })
    .type(category2Type, SingleSelectField, {
      options: valueOptions(category2Type.options),
    }),
);

export function LoginExample() {
  const [data, setData] = useState<inferFormValue<typeof UserForm>>();
  return (
    <>
      <UserForm value={data} onChange={setData} />
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </>
  );
}
