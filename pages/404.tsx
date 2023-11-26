import React from 'react';
import styles from './404.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container} data-testid="NotFoundPage">
      <h2 className={styles.title}>404</h2>
      <div className={styles.text}>PAGE NOT FOUND</div>
    </div>
  );
};

export default NotFoundPage;
