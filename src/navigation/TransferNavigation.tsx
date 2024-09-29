import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackScreenProps} from '@react-navigation/stack';

import {TopTabBar} from './components/TopTabBar';

import TransferPutIn from '@screens/Transfer/TransferPutIn';
import TransferPutOut from '@screens/Transfer/TransferPutOut';

import {scaledSize} from '@utils/scaledSize';

const Tab = createMaterialTopTabNavigator();

export default function TransferNavigation({route}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const darkBackground = EStyleSheet.value('$darkBackground');
  const currencyId = route.params?.currencyId;
  return (
    <Tab.Navigator
      tabBar={TopTabBar}
      sceneContainerStyle={{
        backgroundColor: darkBackground,
        paddingHorizontal: scaledSize(16),
      }}
      lazy={true}>
      <Tab.Screen
        name="TransferPutIn"
        component={TransferPutIn}
        options={{title: t('common.m_transfer_get')}}
        initialParams={{currencyId}}
      />
      <Tab.Screen
        name="TransferPutOut"
        component={TransferPutOut}
        options={{title: t('common.m_transfer_send')}}
        initialParams={{currencyId}}
      />
    </Tab.Navigator>
  );
}
