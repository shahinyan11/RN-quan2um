import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Ecomining from '@screens/Ecomining';
import TransactionList from '@screens/Ecomining/TransactionList';
import {EcominingOptions} from './config';
import {EcominingNavigation as ENavigation} from './config/types';
const Stack = createStackNavigator<ENavigation>();

export default function EcominingNavigation() {
  return (
    <Stack.Navigator screenOptions={EcominingOptions}>
      <Stack.Screen
        name="Ecomining"
        component={Ecomining}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
