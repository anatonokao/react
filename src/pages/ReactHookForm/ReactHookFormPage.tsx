import React from 'react';
import ReactHookForm from '../../components/ReactHookForm/ReactHookForm';
import styles from './ReactHookFormPage.module.css';

const ReactHookFormPage = () => {
  return (
    <div className={styles.page}>
      <h1>React Hook Form</h1>
      <ReactHookForm />
    </div>
  );
};

export default ReactHookFormPage;
