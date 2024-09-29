import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopTabBar} from '@navigation/components/TopTabBar';
import {ordersOptions} from '@navigation/config';
import {useTranslation} from 'react-i18next';
import OrdersBook from './OrdersBook';
import LastDeals from './LastDeals';

const Tab = createMaterialTopTabNavigator();

/**
 * Orders tab navigation
 */
const OrdersTabs = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator tabBar={TopTabBar} sceneContainerStyle={ordersOptions}>
      <Tab.Screen
        name="OrdersBook"
        component={OrdersBook}
        options={{
          title: t('common.m_orders-book'),
        }}
      />
      <Tab.Screen
        name="LastDeals"
        component={LastDeals}
        options={{
          title: t('common.m_recent-transaction'),
        }}
      />
    </Tab.Navigator>
  );
};

export default OrdersTabs;
