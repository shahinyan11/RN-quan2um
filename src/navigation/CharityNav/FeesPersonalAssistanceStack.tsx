import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import TransactionCheck from '@screens/Charity/CharityFees/PersonalAssistance/TransactionCheck';
import PersonalAssistance from '@screens/Charity/CharityFees/PersonalAssistance';
import ApplicationRegistration from '@screens/Charity/CharityFees/PersonalAssistance/ApplicationRegistration';
import ButtonBack from '@navigation/components/ButtonBack';
import {charityStackOption} from '@navigation/config';

const Stack = createStackNavigator();

export default function FeesPersonalAssistanceStack() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PersonalAssistance"
        component={PersonalAssistance}
        options={charityStackOption}
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
        name="TransactionCheck"
        component={TransactionCheck}
        options={{
          ...charityStackOption,
          headerTitle: t('charity.check_transaction'),
          headerLeft: props => <ButtonBack {...props} iconColor={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}
