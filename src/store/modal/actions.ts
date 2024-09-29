import {HIDE_MODAL, SHOW_MODAL} from '@store/reducerTypes';
import {Modal} from '@store/modal/types';

export const showModal = (modal: Modal) => ({
  type: SHOW_MODAL,
  payload: modal,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
