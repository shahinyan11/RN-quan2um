import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  current_password: yup.string().required(),
  new_password: yup
    .string()
    .min(8)
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .notOneOf([
      yup.ref('current_password'),
      'The new password must be different from the old one',
    ])
    .required(),
  repeat_password: yup
    .string()
    .oneOf([yup.ref('new_password')])
    .required(),
});

export default changePasswordSchema;
