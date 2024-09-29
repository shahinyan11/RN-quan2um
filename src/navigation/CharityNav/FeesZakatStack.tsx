import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import {charityStackOption} from '@navigation/config';
import ButtonBack from '@navigation/components/ButtonBack';
import ApplicationRegistration from '@screens/Charity/CharityFees/Zakat/ApplicationRegistration';
import TransactionCheck from '@screens/Charity/CharityFees/Zakat/TransactionCheck';
import ApplicationTest from '@screens/Charity/CharityFees/Zakat/ApplicationTest';
import Nisab from '@screens/Charity/CharityFees/Zakat/Nisab';
import Zakat from '@screens/Charity/CharityFees/Zakat';
import StartTest from '@screens/Charity/CharityFees/Zakat/StartTest';

const Stack = createStackNavigator();

export default function FeesZakatStack() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Zakat}
        options={charityStackOption}
      />
      <Stack.Screen
        name="Nisab"
        component={Nisab}
        options={charityStackOption}
      />
      <Stack.Screen
        name="TransactionCheck"
        component={TransactionCheck}
        options={{
          ...charityStackOption,
          headerTitle: t('charity.transaction_check'),
          headerLeft: props => <ButtonBack {...props} iconColor={'black'} />,
        }}
      />
      <Stack.Screen
        name="ApplicationRegistration"
        component={ApplicationRegistration}
        options={{
          ...charityStackOption,
          headerTitle: t('charity.application_registration'),
          headerLeft: props => <ButtonBack {...props} iconColor={'black'} />,
        }}
      />
      <Stack.Screen
        name="StartTest"
        component={StartTest}
        options={charityStackOption}
      />
      <Stack.Screen
        name="ApplicationTest"
        component={ApplicationTest}
        options={{
          ...charityStackOption,
          headerTransparent: true,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}
