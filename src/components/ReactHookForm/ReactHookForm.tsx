import React from 'react';
import styles from './ReactHookForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchema } from '../../utils/yup/yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { cardsSlice } from '../../store/reducers/AppSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Autocomplete from '../Autocomplete/Autocomplete';

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
  const navigate = useNavigate();
  const { addCard } = cardsSlice.actions;
  const countries = useAppSelector((state) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getFieldState,
  } = useForm<IFormFields>({
    mode: 'all',
    resolver: yupResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    const FR = new FileReader();
    FR.readAsDataURL(data.image[0]);
    FR.onloadend = () => {
      dispatch(
        addCard({
          ...data,
          image: FR.result as string,
        }),
      );
      navigate('/');
    };
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputField
          inputType='text'
          placeholder='Name'
          error={errors.name}
          labelText='Name'
          register={register('name')}
        />

        <InputField
          inputType='number'
          placeholder='Age'
          error={errors.age}
          labelText='Age'
          register={register('age')}
        />

        <InputField
          inputType='text'
          placeholder='Email'
          error={errors.email}
          labelText='Email'
          register={register('email')}
        />

        <label className={styles.label + ' ' + styles.password}>
          Password
          <input
            type='password'
            placeholder='Password'
            {...register('password')}
            className={errors.password && styles.invalidField}
            style={
              getFieldState('password').isDirty
                ? {
                    borderBottom: `5px solid ${
                      (!errors.password && '#5bc058') ||
                      (errors.password?.message?.length === 1 && '#c0be58') ||
                      (errors.password?.message?.length === 2 && '#c08c58') ||
                      (errors.password?.message && '#ff5f5f')
                    }`,
                  }
                : {}
            }
          />
          <div className={styles.error}>
            {(errors.password?.message &&
              errors.password?.message.includes('u') &&
              'Password must be contain 1 upper letter') ||
              (errors.password?.message &&
                errors.password?.message.includes('l') &&
                'Password must be contain 1 lower letter') ||
              (errors.password?.message &&
                errors.password?.message.includes('s') &&
                'Password must be contain 1 special character') ||
              (errors.password?.message &&
                errors.password?.message.includes('d') &&
                'Password must be contain 1 digit')}
          </div>
        </label>

        <InputField
          inputType='password'
          placeholder='Repeat password'
          error={errors.repeatPassword}
          labelText='Repeat password'
          register={register('repeatPassword')}
        />

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
            <option value='binary'>binary</option>
            <option value='binary'>binary</option>
            <option value='binary'>binary</option>
          </select>
          <div className={styles.error}>{errors.gender?.message}</div>
        </label>

        <label className={styles.label}>
          Choose your country
          <Autocomplete
            data={countries}
            inputType='search'
            placeholder='United States, Russia, Canada etc.'
            register={register('country')}
            className={styles.invalidField}
            error={errors.country?.message}
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

        <button disabled={!isValid} className={styles.actionBtn}>
          Send
        </button>
      </form>
    </div>
  );
};
export default ReactHookForm;
