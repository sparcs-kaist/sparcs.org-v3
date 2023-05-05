import LinkIcon from "@mui/icons-material/Link";
import React from "react";
import styles from "./styles.module.css";

type ProjectLogoProps = {
  name: string;
  url: string;
  catchphrase: string;
};

export default function ProjectLogo({
  name,
  url,
  catchphrase,
}: ProjectLogoProps): JSX.Element {
  const ext = name === "Biseo" ? `png` : `svg`;
  const logoUrl = `/projects/logo/${name.toLowerCase()}-logo.${ext}`;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img
          className={styles.logo}
          loading="lazy"
          alt={`${name} Logo`}
          src={logoUrl}
        ></img>
        <p className={styles.catchphrase}>{catchphrase}</p>
        <a className={styles.overlay} href={url} target="_blank">
          <LinkIcon className={styles.icon} />
          {url}
        </a>
      </div>
    </section>
  );
}
