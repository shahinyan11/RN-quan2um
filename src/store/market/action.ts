import api from '@api';
import {
  GET_MARKET_DATA,
  GET_HOMEPAGE_SLIDES,
  UPDATE_CURRENCIES_HOME,
  SET_PAIR_CODE,
  GET_HOMEPAGE,
} from '@store/reducerTypes';

/**
 * Get market data for dashboard screen
 * @param {object} params
 */
export const getMarketData = (params: any) => async (dispatch: any) => {
  try {
    const config = {
      params,
    };
    const {data} = await api.get('/market/losers-gainers', config);

    dispatch({
      type: GET_MARKET_DATA,
      payload: data,
    });
    dispatch({
      type: SET_PAIR_CODE,
      payload: data.pairs[0].pair,
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get home page slides
 */
export const getHomePageSlides = () => async (dispatch: any) => {
  try {
    const {data} = await api.get('/pages/slides');

    dispatch({
      type: GET_HOMEPAGE_SLIDES,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get home page list slider pairs and list of couples
 */
export const getHomePage = () => async (dispatch: any) => {
  try {
    const {data} = await api.get('/pages/homepage');

    dispatch({
      type: GET_HOMEPAGE,
      payload: {
        pairs: data.pairs,
        slider_currencies: data.slider_currencies,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Update pair on Home screen via socket
 * @param {object} data - item of currency
 */
export const onUpdateCurrenciesHome = (data: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_CURRENCIES_HOME,
    payload: data,
  });
};
