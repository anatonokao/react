import React, { FormEvent } from 'react';
import styles from './UncontrolledForm.module.css';
import { FormSchema } from '../../utils/yup/yup';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  age: HTMLInputElement
  email: HTMLInputElement
  password: HTMLInputElement
  repeatPassword: HTMLInputElement
  gender: HTMLInputElement
  country: HTMLInputElement
  image: HTMLInputElement
  t_and_c: HTMLInputElement
}

const UncontrolledForm = () => {
  const serializeForm = (inputs: FormElements) => {
    const res: { [key: string]: string | boolean } = {};
    for (const input of inputs) {
      const formInput = input as HTMLInputElement;
      if (formInput.name) {
        if (formInput.type === 'checkbox') res[formInput.name] = formInput.checked;
        else res[formInput.name] = formInput.value;
      }
    }
    return res;
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = serializeForm(e.currentTarget.elements as FormElements);
    try {
      FormSchema.validateSync(formData, { abortEarly: false });
      console.log(formData);
    } catch (err) {
      // console.log(err.inner);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <label htmlFor='name' className={styles.label}>
        Name
      </label>
      <input type='text' name='name' id='name' placeholder='Name' />

      <label htmlFor='age' className={styles.label}>
        Age
      </label>
      <input type='number' name='age' id='age' placeholder='Age' />

      <label htmlFor='email' className={styles.label}>
        Email
      </label>
      <input type='text' name='email' id='email' placeholder='Email' />

      <label htmlFor='password' className={styles.label}>
        Password
      </label>
      <input type='password' name='password' id='password' placeholder='Password' />

      <label htmlFor='repeatPassword' className={styles.label}>
        Repeat password
      </label>
      <input
        type='password'
        name='repeatPassword'
        id='repeatPassword'
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
        placeholder={'United States, Russia, Canada etc.'}
      />

      <label htmlFor='image' className={styles.label}>
        Upload your image
      </label>
      <input type='file' name='image' id='image' />

      <div className={styles.t_and_c_container}>
        <input type='checkbox' name='t_and_c' id='t_and_c' />
        <label htmlFor='t_and_c' className={styles.label}>
          Are you accept term&apos;s and conditions?
        </label>
      </div>

      <button className={styles.actionBtn}>Send</button>
    </form>
  );
};

export default UncontrolledForm;
