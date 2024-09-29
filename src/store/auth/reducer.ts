import {IAction} from '@store/types';
import {IAuth, LOGOUT, SET_USER, SET_USER_BALANCE, SET_VALUE} from './types';
import {CHECK_SOCIAL_REGISTER, SET_DOWNTIME_SCREEN} from '@store/reducerTypes';

const initState: IAuth = {
  isAuth: false,
  user: null,
  loading: false,
  isDowntime: false,
  socialRegister: null,
  userBalance: {
    amount: '',
  },
};

const authReducer = (state = initState, action: IAction<any>) => {
  const {type, payload} = action;

  switch (type) {
    case SET_VALUE: {
      const {field, data} = payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    }
    case LOGOUT: {
      return initState;
    }
    case SET_DOWNTIME_SCREEN:
      return {
        ...state,
        isDowntime: payload,
      };
    case CHECK_SOCIAL_REGISTER:
      return {
        ...state,
        socialRegister: payload,
      };
    case SET_USER_BALANCE: {
      return {
        ...state,
        userBalance: payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
