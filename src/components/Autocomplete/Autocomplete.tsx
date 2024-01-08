import React, { FC } from 'react';

interface AutocompleteProps {
  register?: object
  name?: string
  data: string[]
  inputType: string
  placeholder: string
  error?: string
  className?: string
}

const Autocomplete: FC<AutocompleteProps> = (props) => {
  return (
    <>
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        autoComplete='nope'
        list='dataAutocomplete'
        name={props.name}
        {...props.register}
        className={props.error && props.className}
      />
      <datalist id='dataAutocomplete'>
        {props.data.map((country, index) => (
          <option key={index} value={country}></option>
        ))}
      </datalist>
    </>
  );
};

export default Autocomplete;
