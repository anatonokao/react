import * as yup from 'yup';
import { ref } from 'yup';

export const FormSchema = yup.object({
  name: yup
    .string()
    .required('This field is required')
    .test(
      'capitalize',
      'First letter must be in uppercase',
      (val) => !!val && val[0] === val[0].toUpperCase(),
    ),
  age: yup
    .number()
    .required()
    .integer('Incorrect age')
    .min(1, 'Incorrect age')
    .typeError('This field is required'),
  email: yup.string().required('This field is required').email('Incorrect email'),
  password: yup
    .string()
    .required('This field is required')
    .test(function (value) {
      const res = {
        upper: '',
        letter: '',
        digit: '',
        spec_char: '',
      };
      res.upper = /[A-Z]/.test(value) ? '' : 'u';
      res.letter = /[a-z]/.test(value) ? '' : 'l';
      res.digit = /[!@#$%^&*()\-_=+{};:,<.>]/.test(value) ? '' : 'd';
      res.spec_char = /[0-9]/.test(value) ? '' : 's';

      return Object.values(res).join('')
        ? this.createError({
            message: `${res.upper}${res.letter}${res.digit}${res.spec_char}`,
            path: 'password',
          })
        : true;
    }),
  // .matches(/[A-Z]/, 'upper')
  // .matches(/[a-z]/, 'lower')
  // .matches(/[1-9]/, 'digit')
  // .matches(/[!@#$%^&*()\-_=+{};:,<.>]/, 'spec_char'),
  repeatPassword: yup
    .string()
    .required('This field is required')
    .oneOf([ref('password')], 'Both password will be equal'),
  // .when('password'),
  gender: yup.string().required('This field is required').nonNullable(),
  country: yup.string().required('This field is required'),
  image: yup
    .mixed<FileList>()
    .required()
    .test('required', 'Image is required', (value) => value.length > 0)
    .test('fileSize', 'File size is too large', (value) => {
      return !!value.length && value[0].size <= 5242880;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return !!value.length && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
  t_and_c: yup.boolean().required().oneOf([true], "You need accept term's and conditions"),
});
