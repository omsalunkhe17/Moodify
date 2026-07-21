import React from "react";
import styles from "./FeatureCard.module.scss";

const FeatureCard = ({ icon, title, description }) => (
  <article className={styles.featureCard}>
    <div className={styles.icon} aria-hidden="true">
      {icon}
    </div>
    <div className={styles.content}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </article>
);

export default FeatureCard;
