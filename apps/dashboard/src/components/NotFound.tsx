import { Dock, Text } from "@yas/ui";

export default function NotFound() {
  return (
    <Dock position="center" sx={{ textAlign: "center" }}>
      <Text intent="h1">Not found</Text>
      <Text>Sorry, this page {`doesn't`} exist.</Text>
    </Dock>
  );
}
