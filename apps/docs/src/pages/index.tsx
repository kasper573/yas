import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { AlertDialog, Button, Stack, Text, useModal } from "@yas/ui";
import { BellIcon } from "@yas/icons";
import { Providers } from "../Providers";
import * as styles from "./index.css";

export default function HomeWrapper() {
  return (
    <Providers>
      <Home />
    </Providers>
  );
}

function Home() {
  const {
    siteConfig: { title, tagline },
  } = useDocusaurusContext();
  const alert = useModal(AlertDialog);
  return (
    <Layout wrapperClassName={styles.container} description={tagline}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          {title.split(/\s+/).map((word, index) => (
            <span key={index} className={styles.titleWord}>
              {word}
            </span>
          ))}
        </h1>
      </header>

      <main>
        <section className={styles.content}>
          <Text intent="h5" margin>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            corrupti hic molestiae doloremque aspernatur laboriosam veniam minus
            aut officiis, voluptatem fugit fugiat neque fuga, laudantium vero.
            Quae, dolore. Quae, exercitationem.
          </Text>
          <Text intent="h5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            corrupti hic molestiae doloremque aspernatur laboriosam veniam minus
            aut officiis, voluptatem fugit fugiat neque fuga, laudantium vero.
            Quae, dolore. Quae, exercitationem.
          </Text>
        </section>

        <Stack direction="row">
          <Button
            sx={{ margin: "auto" }}
            onClick={() =>
              alert({
                title: "Hello World",
                message: "This is a cool alert dialog",
              })
            }
          >
            <BellIcon /> Hello World
          </Button>
        </Stack>
      </main>
    </Layout>
  );
}
