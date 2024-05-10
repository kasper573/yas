import { useForm } from "react-hook-form";
import { createControllerProxy } from "../src";

interface Data {
  foo: {
    bar?: string;
  };
}

export function ExternalValueSetter({ value }: { value: string }) {
  const form = useForm<Data>({ defaultValues: { foo: { bar: "default" } } });
  const control = createControllerProxy(form);

  return (
    <>
      {control.foo.bar$((props) => (
        <span data-testid="leaf">{JSON.stringify(props.value)}</span>
      ))}
      {control.foo((props) => (
        <span data-testid="root">{JSON.stringify(props.value)}</span>
      ))}
      <button onClick={() => form.setValue("foo.bar", value)}>Update</button>
    </>
  );
}
