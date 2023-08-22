import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import Mountain from "@site/static/img/undraw_docusaurus_mountain.svg";
import Tree from "@site/static/img/undraw_docusaurus_tree.svg";
import styles from "./index.module.css";

export default function Home() {
  const {
    siteConfig: { title, tagline },
  } = useDocusaurusContext();
  return (
    <Layout title={title} description={tagline}>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__subtitle">{tagline}</p>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <Feature title="react-composable-form" image={Tree}>
                Form library for React with focus on composition, convention and
                type safety.
              </Feature>
              <Feature title="react-imperative-hook" image={Mountain}>
                The declarative nature of React is great for most use cases, but
                not always. When working with async UI flows that has
                resolutions, like modals, toasts, drawers, etc. {"you'd"} much
                rather want an imperative and promise based interface, which is
                what this library provides.
              </Feature>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function Feature({ image: Image, title, children }) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <Image className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
