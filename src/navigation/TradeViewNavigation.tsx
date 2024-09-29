import React, {useCallback} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import TradeViewPairs from '@screens/TradeView/TradeViewPairs';
import Orders from '@screens/TradeView/Orders';
import AdditionCharting from '@screens/TradeView/AdditionCharting';
import PairsList from '@screens/TradeView/PairsList/PairsList';
import FilterScreen from '@screens/TradeView/FilterScreen/FilterScreen';

import ButtonLink from '@components/buttons/ButtonLink';
import {TopTabBar} from './components/TopTabBar';

import {ordersOptions, TradeViewOptions} from './config';

import {scaledSize} from '@utils/scaledSize';
import {useTranslation} from 'react-i18next';
import CurrencyFilterScreen from '@screens/TradeView/CurrencyFilterScreen/CurrencyFilterScreen';
import {useFocusEffect} from '@react-navigation/native';
import {selectPair, setFilterOrder} from '@store/tradeview';
import {useDispatch, useSelector} from 'react-redux';
import Sockets from '@utils/sockets';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import Chat from '@screens/Market/Chat';
import TradeViewTab from '@navigation/TradeViewTab';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const styles = EStyleSheet.create({
  headerRightContainerStyle: {
    marginRight: scaledSize(8),
  },
});

const ButtonRight = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onOrders = () => navigation.navigate('Orders');

  return (
    <ButtonLink
      title={t('common.orders')}
      onPress={onOrders}
      containerStyle={styles.headerRightContainerStyle}
    />
  );
};

const ButtonRightFilter = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onFilter = () => navigation.navigate('FilterScreen');

  return (
    <ButtonLink
      title={t('common.m_filter')}
      onPress={onFilter}
      containerStyle={styles.headerRightContainerStyle}
    />
  );
};

function OrdersTabView() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        Sockets.unsubscribes('orders:personal');
        Sockets.listenOff('orders:personal');
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setFilterOrder({value: false, key: 'apply'}));
      };
    }, []),
  );
  return (
    <Tab.Navigator tabBar={TopTabBar} sceneContainerStyle={ordersOptions}>
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: t('common.open_orders'),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TradeViewStack() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const pair = useSelector(selectPair);
  const darkBackground = EStyleSheet.value('$darkBackground');
  const setPairs = () => {
    navigation.navigate('PairsList');
  };

  return (
    <Stack.Navigator screenOptions={TradeViewOptions}>
      <Stack.Screen
        name="TradeViewTab"
        component={TradeViewTab}
        options={{
          headerShown: false,
          cardStyle: {
            paddingHorizontal: 0,
            backgroundColor: darkBackground,
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          cardStyle: {
            paddingHorizontal: 0,
            backgroundColor: darkBackground,
          },
        }}
      />

      {/*<Stack.Screen*/}
      {/*  name="TradeView"*/}
      {/*  component={TradeView}*/}
      {/*  options={{*/}
      {/*    headerRight: ButtonRight,*/}
      {/*    title: t('common.tradeview'),*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack.Screen
        name="TradeViewPairs"
        component={TradeViewPairs}
        options={{
          title: t('common.tradeview'),
        }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersTabView}
        options={{title: t('common.orders'), headerRight: ButtonRightFilter}}
      />
      <Stack.Screen
        name="AdditionCharting"
        component={AdditionCharting}
        options={{
          title: (
            <TouchableOpacity
              onPress={setPairs}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text type="t4">{`${pair.main_currency.code}/${pair.base_currency.code}`}</Text>
              <Icon name="arrow-down" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PairsList"
        component={PairsList}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          title: t('common.m_filter'),
        }}
      />
      <Stack.Screen
        name="CurrencyFilterScreen"
        component={CurrencyFilterScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
