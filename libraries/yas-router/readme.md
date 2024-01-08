# Router

An encapsulation of the [Tanstack Router](https://tanstack.com/router) library. Refer to their documentation.

Also provides custom routing utilities built on top of tanstack router.

## Enhanced route components

A notable change is that Route instances will automatically enhance their component with [createRouteComponent](./src/createRouteComponent), which will automatically pass the route's search params to the component as props, along with a setParams function to update the route's search params by performing a navigation.

The purpose of this to prevent the bad practice of importing route instances all over the codebase when using `myRoute.useSearch()`, which tighly couples all route components with the entire route tree, effectively entangling all route component modules:

```tsx
import { useNavigate } from "@tanstack/react-router";
import { myRoute } from "./routes"; // Contains potentially hundreds of routes, which we now indirectly depend on

export function MyRouteComponent() {
  const navigate = useNavigate();
  const search = myRoute.useSearch();

  return (
    <>
      Input date: {search.date?.toString()}
      <button
        onClick={() =>
          navigate({
            to: myRoute.fullPath,
            search: { date: new Date() },
          })
        }
      >
        Update date
      </button>
    </>
  );
}
```

Instead, the route component should be written like this:

```tsx
import { RouteComponentProps } from "@yas/router";

export function MyRouteComponent({
  search,
  setSearch,
}: RouteComponentProps<{ date?: Date }>) {
  return (
    <>
      Input date: {search.date?.toString()}
      <button onClick={() => setSearch({ date: new Date() })}>
        Update date
      </button>
    </>
  );
}
```

While this approach is slightly more verbose, sinceyou can't infer the search params type from the route instance, we have now successfully decoupled the route component from the route tree.
