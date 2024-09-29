import * as yup from 'yup';

const tfaValidation = ({
  isEmailRequired,
  isPhoneRequired,
  isTfaRequired,
}: any = {}) => {
  return yup.object().shape({
    email_code: isEmailRequired ? yup.string().required() : yup.string(),
    phone_code: isPhoneRequired ? yup.string().required() : yup.string(),
    tfa_code: isTfaRequired ? yup.string().required() : yup.string(),
  });
};

export default tfaValidation;
