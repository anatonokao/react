import React, { FC } from 'react';
import styles from '../ReactHookForm/ReactHookForm.module.css';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
  inputType: string
  placeholder: string
  register?: object
  name?: string
  error?: FieldError | { message: string } | undefined
  labelText: string
}

const InputField: FC<InputFieldProps> = (props) => {
  return (
    <label className={styles.label}>
      {props.labelText}
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        name={props.name}
        {...props.register}
        className={props.error?.message && styles.invalidField}
      />
      <div className={styles.error}>{props.error?.message}</div>
    </label>
  );
};

export default InputField;
