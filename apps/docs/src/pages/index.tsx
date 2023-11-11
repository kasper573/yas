import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ComponentProps, ReactNode } from "react";
import { projects } from "../../fixtures/projects";
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
        <p className={styles.tagline}>{tagline}</p>
      </header>
      <main>
        <section>
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
  const linkContent = (
    <>
      <img
        src={image}
        className={styles.featureImage}
        role="img"
        width={200}
        height={150}
        alt={`${title} image`}
      />

      <h2>{title}</h2>
    </>
  ) as ComponentProps<typeof Link>["children"];
  return (
    <div className={styles.feature({ columns: projects.length })}>
      <Link to={href} style={{ display: "block" }}>
        {linkContent}
      </Link>
      <p>{children}</p>
    </div>
  );
}
