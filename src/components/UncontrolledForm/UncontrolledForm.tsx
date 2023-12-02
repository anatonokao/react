import React from 'react';
import styles from './UncontrolledForm.module.css';

const UncontrolledForm = () => {
  return (
    <form className={styles.form}>
      <label htmlFor='name' className={styles.label}>
        Name
      </label>
      <input type='text' name='name' id='name' required={true} placeholder='Name' />

      <label htmlFor='age' className={styles.label}>
        Age
      </label>
      <input type='number' name='age' id='age' required={true} placeholder='Age' />

      <label htmlFor='email' className={styles.label}>
        Email
      </label>
      <input type='text' name='email' id='email' required={true} placeholder='Email' />

      <label htmlFor='password' className={styles.label}>
        Password
      </label>
      <input type='password' name='password' id='password' required={true} placeholder='Password' />

      <label htmlFor='repeatPassword' className={styles.label}>
        Repeat password
      </label>
      <input
        type='password'
        name='repeatPassword'
        id='repeatPassword'
        required={true}
        placeholder='Repeat password'
      />

      <label htmlFor='gender' className={styles.label}>
        Gender
      </label>
      <select name='gender' id='gender' className={styles.selectGender} size={1}>
        <option value='male'>male</option>
        <option value='female'>female</option>
      </select>

      <label htmlFor='country' className={styles.label}>
        Choose your country
      </label>
      <input
        type='search'
        name='country'
        id='country'
        required={true}
        placeholder={'United States, Russia, Canada etc.'}
      />

      <label htmlFor='image' className={styles.label}>
        Upload your image
      </label>
      <input type='file' name='image' id='image' required={true} />

      <div className={styles.t_and_c_container}>
        <input type='checkbox' name='t_and_c' id='t_and_c' required={true} />
        <label htmlFor='t_and_c' className={styles.label}>
          Are you accept term&apos;s and conditions?
        </label>
      </div>

      <button className={styles.actionBtn}>Send</button>
    </form>
  );
};

export default UncontrolledForm;
