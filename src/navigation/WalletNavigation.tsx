import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import Wallet from '@screens/Wallet';
import WalletCurrency from '@screens/Wallet/WalletCurrency';
import CurrencyTransaction from '@screens/Wallet/CurrencyTransaction';
import CurrencyP2PTransaction from '@screens/Wallet/CurrencyP2PTransaction';

import TabBarCurrency from './components/TabBarCurrency';

import {TransferTabOptions, walletScreenOptions} from './config';

import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

export function CurrencyDetailNavigation({currencyId}: any) {
  const tabOptions = TransferTabOptions();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      lazy
      tabBar={(props: MaterialTopTabBarProps) => (
        <TabBarCurrency
          {...props}
          leftLabel={t('common.price')}
          centerLabel={t('common.type')}
          rightLabel={t('common.time')}
        />
      )}
      sceneContainerStyle={tabOptions}>
      <Tab.Screen
        initialParams={{currencyId}}
        name="Transactions"
        component={CurrencyTransaction}
        options={{
          title: t('common.m_transaction'),
        }}
      />

      <Tab.Screen
        initialParams={{currencyId}}
        name="P2PTransactions"
        component={CurrencyP2PTransaction}
        options={{
          title: t('p2p.title_main'),
        }}
      />
    </Tab.Navigator>
  );
}

export default function WalletNavigation() {
  return (
    <Stack.Navigator screenOptions={walletScreenOptions}>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalletCurrency"
        component={WalletCurrency}
        options={{
          headerShown: true,
          cardStyle: {
            paddingHorizontal: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}
