import React from "react";
import styles from "../../styles/common/Loader.module.css";

function Loader({ loading, text }) {
  return loading ? (
    <div>
      <div className={styles.wrapper}>
        <span className={`${styles.circle} ${styles["circle-1"]}`}></span>
        <span className={`${styles.circle} ${styles["circle-2"]}`}></span>
        <span className={`${styles.circle} ${styles["circle-3"]}`}></span>
        <span className={`${styles.circle} ${styles["circle-4"]}`}></span>
        {/* <span className={`${styles.circle} ${styles["circle-5"]}`}></span> */}
        {/* <span className={`${styles.circle} ${styles["circle-6"]}`}></span> */}
        {/* <span className={`${styles.circle} ${styles["circle-7"]}`}></span> */}
        {/* <span className={`${styles.circle} ${styles["circle-8"]}`}></span> */}
      </div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  ) : null;
}

export default Loader;
