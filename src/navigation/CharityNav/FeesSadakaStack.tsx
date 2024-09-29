import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';

import ButtonBack from '@navigation/components/ButtonBack';
import {charityStackOption} from '@navigation/config';
import ApplicationRegistration from '@screens/Charity/CharityFees/Sadaka/ApplicationRegistration';
import TransactionCheck from '@screens/Charity/CharityFees/Sadaka/TransactionCheck';
import Sadaka from '@screens/Charity/CharityFees/Sadaka';
import StartTest from '@screens/Charity/CharityFees/Sadaka/StartTest';
import ApplicationTest from '@screens/Charity/CharityFees/Sadaka/ApplicationTest';

const Stack = createStackNavigator();

export default function FeesSadakaStack() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sadaka"
        component={Sadaka}
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
