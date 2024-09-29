import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import BottomTabBar from './components/BottomTabBar';
import {
  ChartsIcon,
  DashboardIcon,
  LoginIcon,
  tabBarOptions,
  sceneContainerStyle,
} from './components/BottomTabBar/config';

import Market from '@screens/Market';

import DashboardNavigation from './DashboardNavigation';
import AuthNavigation from './AuthNavigation';

const BottomTab = createBottomTabNavigator();

const MainNavigationIncognito = () => {
  const {t} = useTranslation();
  return (
    <BottomTab.Navigator
      tabBar={BottomTabBar}
      sceneContainerStyle={sceneContainerStyle}
      tabBarOptions={tabBarOptions}>
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible = screenName === 'Dashboard' || !screenName;
          return {
            title: t('common.home'),
            tabBarIcon: DashboardIcon,
            tabBarVisible,
          };
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={Market}
        options={{
          title: t('common.market'),
          tabBarIcon: ChartsIcon,
        }}
      />
      <BottomTab.Screen
        name="Auth"
        component={AuthNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible = screenName === 'Auth' || !screenName;

          return {
            title: t('auth.signin'),
            tabBarIcon: LoginIcon,
            tabBarVisible,
          };
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigationIncognito;
