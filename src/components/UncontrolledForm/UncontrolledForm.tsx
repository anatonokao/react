import React, { FormEvent, useState } from 'react';
import styles from './UncontrolledForm.module.css';
import { countries } from '../../assets/countries';
import InputField from '../InputField/InputField';
import Autocomplete from '../Autocomplete/Autocomplete';
import { FormSchema } from '../../utils/yup/yup';
import { useAppDispatch } from '../../store/hooks/redux';
import { cardsSlice } from '../../store/reducers/AppSlice';
import { ValidationError } from 'yup';

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

interface InputErrors {
  name: string[]
  age: string[]
  email: string[]
  password: string[]
  repeatPassword: string[]
  gender: string[]
  country: string[]
  image: string[]
  t_and_c: string[]
}

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const { addCard } = cardsSlice.actions;

  const [errors, setErrors] = useState<InputErrors>({
    name: [],
    age: [],
    email: [],
    password: [],
    repeatPassword: [],
    gender: [],
    country: [],
    image: [],
    t_and_c: [],
  });

  const serializeForm = (inputs: FormElements) => {
    return {
      age: inputs.age.value,
      country: inputs.country.value,
      email: inputs.email.value,
      gender: inputs.gender.value,
      image: inputs.image.files,
      name: inputs.name.value,
      password: inputs.password.value,
      repeatPassword: inputs.repeatPassword.value,
      t_and_c: inputs.t_and_c.checked,
    };
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = serializeForm(e.currentTarget.elements as FormElements);
    try {
      FormSchema.validateSync(formData, { abortEarly: false });
      const FR = new FileReader();
      formData.image && FR.readAsDataURL(formData.image[0]);
      FR.onloadend = () => {
        dispatch(
          addCard({
            age: Number(formData.age),
            country: formData.country,
            email: formData.email,
            gender: formData.gender,
            name: formData.name,
            password: formData.password,
            t_and_c: formData.t_and_c,
            image: FR.result as string,
          }),
        );
      };
    } catch (e) {
      const formErrors = e as ValidationError;
      const er: InputErrors = {
        name: [],
        age: [],
        email: [],
        password: [],
        repeatPassword: [],
        gender: [],
        country: [],
        image: [],
        t_and_c: [],
      };
      formErrors.inner.forEach((error) => {
        er[error.path as keyof InputErrors].push(error.message);
      });
      setErrors(er);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <InputField
          inputType='text'
          placeholder='Name'
          error={{ message: errors.name[0] }}
          labelText='Name'
          name='name'
        />

        <InputField
          inputType='number'
          placeholder='Age'
          error={{ message: errors.age[0] }}
          labelText='Age'
          name='age'
        />

        <InputField
          inputType='text'
          placeholder='Email'
          // error={errors.email}
          labelText='Email'
          name='email'
        />

        <label className={styles.label + ' ' + styles.password}>
          Password
          <input
            type='password'
            placeholder='Password'
            name='password'
            //className={errors.password && styles.invalidField}
            // style={
            //   getFieldState('password').isDirty
            //     ? {
            //         borderBottom: `5px solid ${
            //           (!errors.password && '#5bc058') ||
            //           (errors.password?.message?.length === 1 && '#c0be58') ||
            //           (errors.password?.message?.length === 2 && '#c08c58') ||
            //           (errors.password?.message && '#ff5f5f')
            //         }`,
            //       }
            //     : {}
            // }
          />
          {/*<div className={styles.error}>{errors.password?.message}</div>*/}
        </label>

        <InputField
          inputType='password'
          placeholder='Repeat password'
          // error={errors.repeatPassword}
          labelText='Repeat password'
          name='repeatPassword'
        />

        <label className={styles.label}>
          Gender
          <select
            className={
              styles.selectGender + ' '
              // (errors.gender && styles.invalidField)
            }
            name='gender'
            defaultValue={''}
          >
            <option value='' disabled hidden>
              Select gender
            </option>
            <option value='male'>male</option>
            <option value='female'>female</option>
          </select>
          {/*<div className={styles.error}>{errors.gender?.message}</div>*/}
        </label>

        <label className={styles.label}>
          Choose your country
          <Autocomplete
            data={countries}
            inputType='search'
            placeholder='United States, Russia, Canada etc.'
            name='country'
            className={styles.invalidField}
            // error={errors.country?.message}
          />
          {/*<div className={styles.error}>{errors.country?.message}</div>*/}
        </label>

        <label className={styles.label}>
          Upload your image
          <input
            type='file'
            name='image'
            // className={errors.image && styles.invalidField}
          />
          {/*<div className={styles.error}>{errors.image?.message}</div>*/}
        </label>

        <label className={`${styles.label} ${styles.t_and_c}`}>
          <input
            type='checkbox'
            name='t_and_c'
            // className={errors.t_and_c && styles.invalidField}
          />
          Are you accept term&apos;s and conditions?
          {/*<div className={styles.error}>{errors.t_and_c?.message}</div>*/}
        </label>

        <button type='submit' className={styles.actionBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
