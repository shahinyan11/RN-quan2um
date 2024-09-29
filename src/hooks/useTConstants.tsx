import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import i18n from 'i18next';

import {
  getFiltersTypes,
  getTypesOfBet,
  getOrdersList,
  getSelectorsList,
  getSelectorsQuantity,
  getIntervals,
} from '@constants/index';

import {selectLanguage} from '@store/app';

export default function useTConstants() {
  const language = useSelector(selectLanguage);
  const [FILTER_TYPES, setFilterTypes] = useState([
    {id: 0, title: i18n.t('common.all'), value: 'all'},
    {id: 1, title: i18n.t('common.m_cryptocurrency'), value: 'crypto'},
    {id: 2, title: i18n.t('common.m_fiat'), value: 'fiat'},
  ]);
  const [SELECTORS_LIST, setSelectorsList] = useState([
    {id: 0, title: i18n.t('home.m_losing_value'), value: 'losers'},
    {id: 1, title: i18n.t('home.m_show_growth'), value: 'gainers'},
  ]);
  const [ORDERS_LIST, setOrdersList] = useState([
    {id: 0, title: i18n.t('common.all'), value: 'all'},
    {id: 1, title: i18n.t('common.m_buy_orders'), value: 'buy'},
    {id: 2, title: i18n.t('common.m_sell_orders'), value: 'sell'},
  ]);
  const [TYPES_OF_BET, setTypesOfBet] = useState([
    {id: 0, title: i18n.t('common.market'), value: 'market'},
    {id: 1, title: i18n.t('common.limit'), value: 'limit'},
  ]);
  const [SELECTORS_QUANTITY, setSelectorsQuantity] = useState([
    {id: 0, title: i18n.t('common.quantity'), value: 'quantity'},
    {id: 1, title: i18n.t('common.total'), value: 'total'},
  ]);

  const [INTERVALS, setIntervals] = useState([
    {id: 0, title: '15 minute', value: '15m'},
    {id: 1, title: '30 minutes', value: '30m'},
    {id: 2, title: '1 hour', value: '1h'},
    {id: 3, title: '2 hours', value: '2h'},
    {id: 4, title: '4 hours', value: '4h'},
    {id: 5, title: '12 hours', value: '12h'},
    {id: 6, title: '1 day', value: '1D'},
    {id: 7, title: '1 week', value: '1W'},
    {id: 8, title: '1 month', value: '1m'},
    {id: 9, title: '5 months', value: '5m'},
  ]);

  useEffect(() => {
    setFilterTypes(getFiltersTypes());

    setSelectorsList(getSelectorsList());

    setOrdersList(getOrdersList());

    setTypesOfBet(getTypesOfBet());

    setSelectorsQuantity(getSelectorsQuantity());
    setIntervals(getIntervals());
  }, [language.locale]);

  return {
    FILTER_TYPES,
    SELECTORS_LIST,
    ORDERS_LIST,
    TYPES_OF_BET,
    SELECTORS_QUANTITY,
    INTERVALS,
  };
}
