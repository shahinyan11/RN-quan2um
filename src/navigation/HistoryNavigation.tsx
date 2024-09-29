import React, {useCallback} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import TabBarHistory from './components/TabBarHistory';

import PutIn from '@screens/History/PutIn';
import PutOut from '@screens/History/PutOut';

import {scaledSize} from '@utils/scaledSize';
import {useFocusEffect} from '@react-navigation/native';
import {onClearHistoryOut, onClearHistory} from '@store/account';
import {useDispatch} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const HistoryNavigation = ({route}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {
    params = {
      screen: 'HistoryPutIn',
      params: {
        currencyId: undefined,
      },
    },
  } = route;

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(onClearHistoryOut());
        dispatch(onClearHistory());
      };
    }, []),
  );

  const backgroundColor = EStyleSheet.value('$darkBackground');

  return (
    <Tab.Navigator
      initialRouteName={params.screen}
      tabBar={props => (
        <TabBarHistory
          {...props}
          leftLabel={t('common.currency')}
          centerLabel={t('common.status')}
          rightLabel={t('common.quantity')}
        />
      )}
      sceneContainerStyle={{
        paddingHorizontal: scaledSize(16),
        backgroundColor,
      }}>
      <Tab.Screen
        name="HistoryPutIn"
        component={PutIn}
        options={{
          title: t('assets.history_deposit'),
        }}
        initialParams={{currencyId: params.params.currencyId}}
      />

      <Tab.Screen
        name="HistoryPutOut"
        component={PutOut}
        options={{
          title: t('assets.history_withdraw'),
        }}
        initialParams={{
          currencyId: params.params.currencyId,
        }}
      />
    </Tab.Navigator>
  );
};

export default HistoryNavigation;
