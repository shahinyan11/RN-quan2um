import {
  GET_MARKET_DATA,
  GET_HOMEPAGE_SLIDES,
  UPDATE_CURRENCIES_HOME,
  GET_HOMEPAGE,
} from '@store/reducerTypes';

const initialState = {
  marketData: null,
  homePageSlides: [],
  homePage: null,
};

const marketReducer = (state = initialState, action: any) => {
  const {type, payload} = action;

  switch (type) {
    case GET_MARKET_DATA:
      return {
        ...state,
        marketData: payload,
      };
    case GET_HOMEPAGE_SLIDES:
      return {
        ...state,
        homePageSlides: payload,
      };
    case UPDATE_CURRENCIES_HOME:
      return {
        ...state,
        homePage: {
          pairs: state.homePage.pairs.map(item => {
            if (item.pair_id === payload.pair_id) {
              return {
                ...item,
                last_price: payload.price.toString(),
                last_price_face: payload.pf,
                change_24: payload.change,
                volume_24_face: payload.main_volume_face,
              };
            }
            return item;
          }),
          slider_currencies: state.homePage.slider_currencies.map(item => {
            if (item.pair_id === payload.pair_id) {
              return {
                ...item,
                last_price: payload.price.toString(),
                last_price_face: payload.pf,
                change_24: payload.change,
              };
            }
            return item;
          }),
        },
      };
    case GET_HOMEPAGE:
      return {
        ...state,
        homePage: payload,
      };
    default:
      return state;
  }
};

export default marketReducer;
