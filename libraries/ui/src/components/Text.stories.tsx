import type { Meta, StoryObj } from "@yas/test/storybook";
import { keysOf, tokens } from "@yas/design-tokens";
import { Text, textIntentToHtmlTag } from "./Text";

export default {
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export const Default: StoryObj = {
  render(props) {
    return (
      <div style={{ width: 600 }}>
        <Text intent="h1" margin>
          Lorem ipsum dolor
        </Text>
        <Text margin>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          officia temporibus accusamus! Qui animi similique laboriosam?
          Doloremque, dolorem tenetur aliquid neque quos nihil? At perferendis,
          esse hic mollitia nulla optio?
        </Text>
        <Text margin>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          officia temporibus accusamus! Qui animi similique laboriosam?
          Doloremque, dolorem tenetur aliquid neque quos nihil? At perferendis,
          esse hic mollitia nulla optio?
        </Text>
        <Text intent="h2">Lorem ipsum dolor sit amet</Text>
        <Text margin>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          officia temporibus accusamus! Qui animi similique laboriosam?
          Doloremque, dolorem tenetur aliquid neque quos nihil? At perferendis,
          esse hic mollitia nulla optio?
        </Text>
        <ul>
          <li>
            <Text>
              Praesent auctor purus luctus enim egestas, ac scelerisque ante
              pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu
              tempor urna.
            </Text>
          </li>
          <li>
            <Text>
              Curabitur vel bibendum lorem. Morbi convallis convallis diam sit
              amet lacinia. Aliquam in elementum tellus.
            </Text>
          </li>
        </ul>
        <Text intent="h2" margin>
          Lorem ipsum dolor sit amet:
        </Text>
        <ul>
          <li>
            <Text>
              Praesent auctor purus luctus enim egestas, ac scelerisque ante
              pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu
              tempor urna.
            </Text>
          </li>
          <li>
            <Text>
              Curabitur vel bibendum lorem. Morbi convallis convallis diam sit
              amet lacinia. Aliquam in elementum tellus. Aliquam in elementum
              tellus.
            </Text>
          </li>
          <li>
            <Text>
              Praesent auctor purus luctus enim egestas, ac scelerisque ante
              pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu
              tempor urna.
            </Text>
          </li>
        </ul>
        <Text intent="h2" margin>
          Lorem ipsum dolor sit amet
        </Text>
        <Text intent="h3" margin>
          Ipsum
        </Text>
        <Text margin>
          Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </Text>
        <Text intent="h3" margin>
          Lorem
        </Text>
        <Text margin>
          ...att hon tycker att det är lättast att lära någonting som hon är
          intresserad av. Minna säger att det är ganska lätt att rita och ha
          teknik, men att läsa och skriva är tråkigt och jobbigt.
        </Text>
        <Text intent="h3" margin>
          Lorem ipsum
        </Text>
        <Text margin>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          officia temporibus accusamus! Qui animi similique laboriosam?
          Doloremque, dolorem tenetur aliquid neque quos nihil? At perferendis,
          esse hic mollitia nulla optio?
        </Text>
        <ol>
          <li>
            <Text>Lorem</Text>
          </li>
          <li>
            <Text>Impsum</Text>
          </li>
          <li>
            <Text>Dolor</Text>
          </li>
        </ol>
      </div>
    );
  },
};

export const Variants: StoryObj<Meta<typeof Text>> = {
  render(props) {
    return (
      <table>
        <thead>
          <tr>
            <th>Normal</th>
            <th>Italic</th>
            <th>Bold</th>
            <th>Bold + Italic</th>
            <th>Html tag</th>
          </tr>
        </thead>
        <tbody>
          {keysOf(tokens.typography).map((intent) => (
            <tr key={intent}>
              <td>
                <Text {...props} intent={intent} sx={{ flex: 1 }}>
                  {intent}
                </Text>
              </td>
              <td>
                <Text
                  {...props}
                  intent={intent}
                  sx={{ flex: 1, fontStyle: "italic" }}
                >
                  {intent}
                </Text>
              </td>
              <td>
                <Text
                  {...props}
                  intent={intent}
                  sx={{ flex: 1, fontWeight: "bold" }}
                >
                  {intent}
                </Text>
              </td>
              <td>
                <Text
                  {...props}
                  intent={intent}
                  sx={{ flex: 1, fontWeight: "bold", fontStyle: "italic" }}
                >
                  {intent}
                </Text>
              </td>
              <td>
                <Text {...props} intent={intent}>
                  {intent ? textIntentToHtmlTag[intent] : null}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const LineHeight: StoryObj<Meta<typeof Text>> = {
  args: {
    margin: false,
    children: [
      `This is a single <Text/> element containing pre-wrapped text content.`,
      `It demonstrates how multiple paragraphs content behave when relying on line height instead of paragraph spacing.`,
      paragraph(),
      paragraph(),
    ].join("\n\n"),
    sx: { whiteSpace: "pre-wrap" },
  },
};

export const ParagraphSpacing: StoryObj<Meta<typeof Text>> = {
  args: { margin: true },
  render(props) {
    return (
      <>
        <Text {...props}>
          These are multiple separate {`<Text paragraph/>`} elements
          demonstrating paragraph spacing.
        </Text>
        <Text {...props}>{paragraph()}</Text>
        <Text {...props}>{paragraph()}</Text>
      </>
    );
  },
};

function paragraph() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique eu orci id varius. Duis bibendum purus at mi faucibus, eget dapibus neque sollicitudin. Aliquam euismod nunc non ex interdum laoreet. Nam sed tempor ex, et dignissim quam. Quisque semper lectus et nisl blandit, sed venenatis lacus fringilla. Curabitur eget orci ultricies orci consequat pellentesque. Ut faucibus egestas tortor quis aliquet.";
}
