# Yas UI

## Using the library

See https://@yas/ui.vercel.app/ for the latest documentation based on the storybook.

## Contributing to the library

### We use the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology.

Component files must be placed in a folder named after the atomic design level they belong to, ie. `atoms/Button.tsx`.

### Styling is done with CSS-in-JS using [Stitches](https://stitches.dev/)

Stitches is a lightweight, performant styling library with a focus on component architecture and developer experience.

It also integrates perfectly with Radix UI, our component primitives library of choice.

### Component primitives provided by [Radix UI](https://www.radix-ui.com/)

Radix UI primitives are unstyled react components with logic and accessibility compatibility provided out of the box.

All we need to do when implementing a new component is to add our own styling and re-export them:

1. First, add the new primitive package dependency from `@radix-ui/react-*`.
2. Create your new component file, style and re-export the new primitive(s). [See Radix UI docs for example](https://www.radix-ui.com/docs/primitives/overview/styling#styling-with-css-in-js).

> If radix does not provide a primitive for your use case, it's either:
>
> - So simple that we easily can create our own, in which case go ahead and do it.
> - So complicated that we _have_ to create our own, in which case discuss it with the team.

### Components must be data agnostic

To maximize portability, maintainability and testability, components should not contain any data fetching logic:

```tsx
function BadComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://example.com/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data}</div>;
}

function GoodComponent({ data }) {
  return <div>{data}</div>;
}
```

However, if a component benefits heavily from data fetching patterns, ie. pagination, infinite scrolling, etc. you should still rely on dependency injection and let the consumer provide the data fetching logic via a prop:

```tsx
function GoodComponent({ query: useQuery }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({ page });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <Table data={data} currentPage={page} onPageChanged={setPage} />;
}
```

### Documentation & Component testing is done with [Storybook](https://storybook.js.org/).

Stories should be defined in a file next to their related component, ie. `Button.stories.tsx`

### Unit testing should rarely be necessary, but is allowed via [Vitest](https://vitest.dev/).

Never test components with vitest. Use storybook instead.
