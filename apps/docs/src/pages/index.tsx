import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
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
        <h2 className={styles.tagline}>{tagline}</h2>
      </header>
      <main>
        <section>
          <div className="container">
            <div className="row">
              <h2>
                These docs exists as a POC but also because docusaurus is
                notoriously hellish to integrate with due to its wacky webpack
                abstraction, so it is great for testing compatibility.
              </h2>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
