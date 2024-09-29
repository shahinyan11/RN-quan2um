import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import Funds from '@screens/Charity/CharityFees/Funds';
import ApplicationRegistration from '@screens/Charity/CharityFees/Funds/ApplicationRegistration';
import FundDirection from '@screens/Charity/CharityFees/Funds/FundDirection';
import ButtonBack from '@navigation/components/ButtonBack';
import {charityStackOption} from '@navigation/config';
import Fund from '@screens/Charity/CharityFees/Funds/Fund';

const Stack = createStackNavigator();

export default function FeesFundsStack() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Funds"
        component={Funds}
        options={charityStackOption}
      />
      <Stack.Screen
        name="Fund"
        component={Fund}
        options={{
          ...charityStackOption,
          headerTransparent: true,
          headerLeft: props => <ButtonBack {...props} iconColor={'white'} />,
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
        name="FundDirection"
        component={FundDirection}
        options={() => ({
          ...charityStackOption,
          headerTitle: t('charity.directions'),
          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
}
