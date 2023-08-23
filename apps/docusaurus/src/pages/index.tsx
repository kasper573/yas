import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import { projects } from "@site/fixtures/projects";
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
              {projects.map((project, index) => (
                <Feature
                  key={index}
                  title={project.title}
                  image={project.imageUrl}
                  href={project.href}
                >
                  {project.description}
                </Feature>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const columnSizeClass =
  {
    1: "col--12",
    2: "col--6",
  }[projects.length] ?? "col--4";

function Feature({ image, title, children, href }) {
  return (
    <div
      className={clsx(`col ${columnSizeClass} text--center`, styles.feature)}
    >
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
