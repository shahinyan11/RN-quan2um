import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import Withdrawal from '@screens/Withdrawal';
import Scanner from '@screens/Withdrawal/Scanner';
import WithdrawalWallets from '@screens/Withdrawal/WithdrawalWallets';
import WithdrawalWalletsOperations from '@screens/Withdrawal/WithdrawalWallets/WithdrawalWallets';
import WithdrawalVerification from '@screens/Withdrawal/WithdrawalVerification';

import BankAccountAdd from '@screens/Withdrawal/BankAccountAdd';

import {defaultScreenOptions, withdrawalScreenOptions} from './config';

const Stack = createStackNavigator();

export default function WithdrawalNavigation({route}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const defaultOptions = defaultScreenOptions();

  return (
    <Stack.Navigator screenOptions={withdrawalScreenOptions}>
      <Stack.Screen
        name="Withdrawal"
        component={Withdrawal}
        options={{
          ...defaultOptions,
          title: t('common.withdraw'),
        }}
        initialParams={{...route.params}}
      />
      <Stack.Screen
        name="WithdrawalWallets"
        component={WithdrawalWallets}
        options={{...defaultOptions, title: t('common.address')}}
      />
      <Stack.Screen
        name="WithdrawalWalletsOperations"
        component={WithdrawalWalletsOperations}
        options={{
          ...defaultOptions,
          title: `${t('common.add')} ${t('common.address')}`,
        }}
      />
      <Stack.Screen
        name="WithdrawalVerification"
        component={WithdrawalVerification}
        options={{
          ...defaultOptions,
          title: '',
        }}
      />
      <Stack.Screen
        name="BankAccountAdd"
        component={BankAccountAdd}
        options={{
          ...defaultOptions,
          title: t('withdrawal_to_bank.m_add_invoice'),
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          ...defaultOptions,
          cardStyle: {
            paddingHorizontal: 0,
          },
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
