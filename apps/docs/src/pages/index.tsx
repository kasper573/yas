import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Text } from "@yas/ui";
import * as styles from "./index.css";

export default function Home() {
  const {
    siteConfig: { title, tagline },
  } = useDocusaurusContext();
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
      </main>
    </Layout>
  );
}
