# Yas UI

Please follow the conventions outlined below when developing components for Yas UI.

### Styling is done using `@yas/style`

[@yas/style docs](https://github.com/kasper573/yas/tree/master/libraries/style)

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
