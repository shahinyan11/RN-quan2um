import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ModalCustom from '@components/modals/ModalCustom';
import Text from '@components/textes/Text';
import Button from '@components/buttons/Button';
import Link from '@components/textes/Link';
import IconGradient from '@components/icons/IconGradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  getOrders,
  onCancelOrder,
  onUpdateOrder,
  selectOrders,
} from '@store/tradeview';

import styles from './styles';

import {selectUser} from '@store/auth';
import useAppState from '@hooks/useAppState';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Sockets from '@utils/sockets';
import {isEmpty} from 'ramda';
import EmptyList from '@components/containers/EmptyList';
import OrderCard from '@screens/TradeView/Orders/OrderCard';
import eventEmitter from '@services/eventEmmiter';
import EVENTS from '@constants/events';

function Orders() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const appStateVisible = useAppState();
  const focused = useIsFocused();
  const orders = useSelector(selectOrders);
  const {ws_access_token} = useSelector(selectUser);
  const [isFocused, setFocused] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null as number | null);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('orders:personal');
        Sockets.listen('orders:personal', ({data}: any) => {
          dispatch(onUpdateOrder(data));
        });
        setFocused(focused);
      }
    }, [appStateVisible, isFocused]),
  );

  useEffect((): any => {
    eventEmitter.on(EVENTS.LOAD_MORE, () =>
      dispatch(getOrders({loadMore: true})),
    );

    return () => eventEmitter.off(EVENTS.LOAD_MORE, () => {});
  }, []);

  useEffect(() => {
    dispatch(getOrders({loadMore: false}));
  }, [ws_access_token]);

  const onModalClose = useCallback(() => setSelectedOrder(null), []);

  const onCancelOrders = useCallback(() => {
    dispatch(onCancelOrder({ids: [selectedOrder]}));
    setModalVisible(false);
  }, [selectedOrder]);

  const onSetSelectedOrder = useCallback((id: number) => {
    setSelectedOrder(id);
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [selectedOrder]);

  return (
    <>
      {isEmpty(orders) && <EmptyList />}

      {orders.map(item => (
        <OrderCard data={item} onCancel={onSetSelectedOrder} />
      ))}

      <ModalCustom visible={isModalVisible} onClose={onModalClose}>
        <IconGradient
          name="alert"
          colors={[
            EStyleSheet.value('$gYellowStart'),
            EStyleSheet.value('$gYellowEnd'),
          ]}
          containerStyle={styles.iconContainerStyle}
        />
        <Text type="t3" style={styles.titleStyle} textAlign="center">
          {t('common.m_alert_title')}
        </Text>
        <Text type="description" textAlign="center">
          {t('common.m_cancel_order_hint')}
        </Text>

        <Button
          title={t('common.confirm')}
          containerStyle={styles.btnContainerStyle}
          onPress={onCancelOrders}
        />
        <Link
          type="btnSmall"
          title={t('common.m_cancel')}
          linkStyle={styles.btnCancelTitleStyle}
          onPress={onModalClose}
        />
      </ModalCustom>
    </>
  );
}

export default Orders;
