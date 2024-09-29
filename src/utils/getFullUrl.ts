import {store} from '@store/index';

const getImageUrl = url => {
  const baseUrl = store.getState().app?.baseUrl;
  const domain = baseUrl.replace(/\/api(?!.*\/api)/, '');
  return `${domain}/images/${url}`;
};

export default getImageUrl;
