import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import type { ReactNode } from "react";
import { projects } from "../../fixtures/projects";
import styles from "./index.module.css";

export default function Home() {
  const {
    siteConfig: { title, tagline },
  } = useDocusaurusContext();
  return (
    <Layout description={tagline}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          {title.split(/\s+/).map((word, index) => (
            <span key={index} className={styles.titleWord}>
              {word}
            </span>
          ))}
        </h1>
        <p className={styles.tagline}>{tagline}</p>
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
  }[projects.length as number] ?? "col--4";

function Feature({
  image,
  title,
  children,
  href,
}: {
  image: string;
  title: string;
  children: ReactNode;
  href: string;
}) {
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
