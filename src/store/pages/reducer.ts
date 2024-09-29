import {IAction, IPayload} from '@store/types';
import {IPages, SET_VALUE} from './types';
import {GET_REGISTER_LIST} from '@store/reducerTypes';

const initState: IPages = {
  loading: false,
  faq: {
    data: {},
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  termsList: null,
};

const pagesReducer = (state = initState, action: IAction<IPayload<any>>) => {
  const {type, payload} = action;
  switch (type) {
    case SET_VALUE: {
      const {field, data} = payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case GET_REGISTER_LIST:
      return {
        ...state,
        termsList: payload,
      };
    default:
      return state;
  }
};

export default pagesReducer;
