import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import Sockets from '@utils/sockets';
import useAppState from '@hooks/useAppState';
import {getOrderHistory, updateHistoryOrder} from '@store/tradeview/actions';
import {selectOrderHistory} from '@store/tradeview';
import OrderCard from '@screens/TradeView/Orders/OrderCard';
import eventEmitter from '@services/eventEmmiter';
import EVENTS from '@constants/events';

export default function OrdersHistory() {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const ordersHistory = useSelector(selectOrderHistory);
  const appStateVisible = useAppState();
  const [isFocused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('orders:personal');
        Sockets.listen('orders:personal', ({data}: any) => {
          dispatch(updateHistoryOrder(data));
        });
        setFocused(focused);
      }
    }, [appStateVisible, isFocused]),
  );

  useEffect((): any => {
    dispatch(getOrderHistory());

    eventEmitter.on(EVENTS.LOAD_MORE, () =>
      dispatch(getOrderHistory({loadMore: true})),
    );

    return () => eventEmitter.off(EVENTS.LOAD_MORE, () => {});
  }, []);

  return (
    <View>
      {ordersHistory.map(item => (
        <OrderCard data={item} key={item.id} />
      ))}
    </View>
  );
}
