import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Verification from '@screens/Profile/Verification';
import UploadDocuments from '@screens/Profile/Verification/UploadDocument';

import {VerificationOptions} from './config';

const Stack = createStackNavigator();

export default function VerificationNavigation() {
  return (
    <Stack.Navigator screenOptions={VerificationOptions}>
      <Stack.Screen name="VChooseDocuments" component={Verification} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
    </Stack.Navigator>
  );
}
