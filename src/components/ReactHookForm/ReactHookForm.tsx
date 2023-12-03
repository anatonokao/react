import React from 'react';
import styles from './ReactHookForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchema } from '../../utils/yup/yup';
import { useAppDispatch } from '../../store/hooks/redux';
import { cardsSlice } from '../../store/reducers/AppSlice';

interface IFormFields {
  name: string
  age: number
  email: string
  password: string
  repeatPassword: string
  gender: string
  country: string
  image: FileList
  t_and_c: boolean
}

const ReactHookForm = () => {
  const dispatch = useAppDispatch();
  const { addCard } = cardsSlice.actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFields>({ mode: 'all', resolver: yupResolver(FormSchema) });
  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    const FR = new FileReader();
    FR.readAsDataURL(data.image[0]);
    FR.onloadend = () =>
      dispatch(
        addCard({
          ...data,
          image: FR.result as string,
        }),
      );
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Name
          <input
            type='text'
            placeholder='Name'
            {...register('name')}
            className={errors.name && styles.invalidField}
          />
          <div className={styles.error}>{errors.name?.message}</div>
        </label>

        <label className={styles.label}>
          Age
          <input
            type='number'
            placeholder='Age'
            {...register('age')}
            className={errors.age && styles.invalidField}
          />
          <div className={styles.error}>{errors.age?.message}</div>
        </label>

        <label className={styles.label}>
          Email
          <input
            type='text'
            placeholder='Email'
            {...register('email')}
            className={errors.email && styles.invalidField}
          />
          <div className={styles.error}>{errors.email?.message}</div>
        </label>

        <label className={styles.label}>
          Password
          <input
            type='password'
            placeholder='Password'
            {...register('password')}
            className={errors.password && styles.invalidField}
          />
          <div className={styles.error}>{errors.password?.message}</div>
        </label>

        <label className={styles.label}>
          Repeat password
          <input
            type='password'
            placeholder='Repeat password'
            {...register('repeatPassword')}
            className={errors.repeatPassword && styles.invalidField}
          />
          <div className={styles.error}>{errors.repeatPassword?.message}</div>
        </label>

        <label className={styles.label}>
          Gender
          <select
            className={styles.selectGender + ' ' + (errors.gender && styles.invalidField)}
            {...register('gender')}
            defaultValue={''}
          >
            <option value='' disabled hidden></option>
            <option value='male'>male</option>
            <option value='female'>female</option>
          </select>
          <div className={styles.error}>{errors.gender?.message}</div>
        </label>

        <label className={styles.label}>
          Choose your country
          <input
            type='search'
            placeholder={'United States, Russia, Canada etc.'}
            {...register('country')}
            className={errors.country && styles.invalidField}
          />
          <div className={styles.error}>{errors.country?.message}</div>
        </label>

        <label className={styles.label}>
          Upload your image
          <input
            type='file'
            {...register('image')}
            className={errors.image && styles.invalidField}
          />
          <div className={styles.error}>{errors.image?.message}</div>
        </label>

        <label className={`${styles.label} ${styles.t_and_c}`}>
          <input
            type='checkbox'
            {...register('t_and_c')}
            className={errors.t_and_c && styles.invalidField}
          />
          Are you accept term&apos;s and conditions?
          <div className={styles.error}>{errors.t_and_c?.message}</div>
        </label>

        <button className={styles.actionBtn}>Send</button>
      </form>
    </div>
  );
};

export default ReactHookForm;
