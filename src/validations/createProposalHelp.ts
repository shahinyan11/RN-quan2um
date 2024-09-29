import * as yup from 'yup';

export default yup.object().shape({
  description: yup.string().required(),
  wallet: yup.string().required(),
  image: yup.object().shape({uri: yup.string()}).required(),
});
