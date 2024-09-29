import {HIDE_MODAL, SHOW_MODAL} from '../reducerTypes';
import {Action} from './types';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };

    case HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
};

export default modalReducer;
