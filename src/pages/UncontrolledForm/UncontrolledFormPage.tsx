import React from 'react';
import UncontrolledForm from '../../components/UncontrolledForm/UncontrolledForm';
import styles from './UncontrolledFormPage.module.css';

const UncontrolledFormPage = () => {
  return (
    <div className={styles.page}>
      <h1>Uncontrolled Form</h1>
      <UncontrolledForm />
    </div>
  );
};

export default UncontrolledFormPage;
