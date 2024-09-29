import * as yup from 'yup';

type Params = {
  data: {
    method: string;
    amount: number;
    from: string;
  };
  min: number;
  max: number;
};

export async function validateExchange({data, min, max}: Params) {
  try {
    const validationSchema = yup.object().shape({
      method: yup.string().required(),
      amount: yup.number().min(min).max(max).required(),
      from: yup
        .string()
        .matches(/^(?:\d{16}|\d{10})$/, 'Invalid Card Number or Phone Number'),
    });

    await validationSchema.validate(data);
  } catch (err) {
    return err;
  }
}

export default validateExchange;
