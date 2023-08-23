import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import jigsawUrl from "@site/static/img/jigsaw.png";
import stepsUrl from "@site/static/img/steps.png";
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
              <Feature
                title="react-composable-form"
                image={jigsawUrl}
                href="/docs/react-composable-form/intro"
              >
                Form library for React with focus on composition, convention and
                type safety.
              </Feature>
              <Feature
                title="react-imperative-hook"
                image={stepsUrl}
                href="/docs/react-imperative-hook/intro"
              >
                React hook for improved DX with async UI flows like modals,
                toasts, drawers, etc.
              </Feature>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function Feature({ image, title, children, href }) {
  return (
    <div className={clsx("col col--6 text--center", styles.feature)}>
      <Link to={href} style={{ display: "block" }}>
        <img
          src={image}
          className={styles.featureImage}
          role="img"
          alt={`${title} image`}
        />
        <h3>{title}</h3>
      </Link>
      <p>{children}</p>
    </div>
  );
}

const H3 = (props) => <h3 {...props} />;
