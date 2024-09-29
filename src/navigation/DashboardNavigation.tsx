import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '@screens/Dashboard';
import LoginScanner from '@screens/Dashboard/LoginScanner/LoginScanner';
import VerifyingInfoLogin from '@screens/Dashboard/VerifyingInfoLogin';
import {dashboardOptions} from '@navigation/config';

const Stack = createStackNavigator();

export default function DashboardNavigation() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="LoginScanner" component={LoginScanner} />
      <Stack.Screen name="VerifyingInfoLogin" component={VerifyingInfoLogin} />
    </Stack.Navigator>
  );
}
