import {CLEAR_FILTERS, SET_FILTERS} from '../reducerTypes';
import {Action} from '@store/modal/types';

const initialState = {
  currency: null,
  status: null,
  information: null,
  time_start: null,
  time_end: null,
  award: null,
  profit: null,
};

const filtersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export default filtersReducer;
