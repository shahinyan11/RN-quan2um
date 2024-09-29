import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required(),
  annotation: yup.string().required(),
  description: yup.string().required(),
  about: yup.string().required(),
  region: yup.string().required(),
  type_id: yup.number().required(),
  wallet: yup.string().required(),
  uri: yup.string().required(),
  odnoklassniki: yup.string().required(),
  vkontakte: yup.string().required(),
  facebook: yup.string().required(),
  instagram: yup.string().required(),
  logo: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .required(),
  cover: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .required(),
  images: yup
    .array()
    .of(
      yup.object().shape({
        uri: yup.string().required(),
      }),
    )
    .min(1),
});
