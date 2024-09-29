import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import {CharityHomeIcon, CharityProfileIcon} from '@assets/svgs/tabs';
import CharityTabBar from '@navigation/components/CharityTabBar';
import CharityFees from '@screens/Charity/CharityFees';
import CharityProfile from '@screens/Charity/CharityProfile';

const CharityTab = createBottomTabNavigator();

export default function CharityNav() {
  const {t} = useTranslation();
  return (
    <CharityTab.Navigator
      tabBar={CharityTabBar}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      <CharityTab.Screen
        name="CharityFees"
        component={CharityFees}
        options={{
          tabBarIcon: CharityHomeIcon,
          title: t('common.aids'),
        }}
      />
      <CharityTab.Screen
        name="CharityProfile"
        component={CharityProfile}
        options={{
          tabBarIcon: CharityProfileIcon,
          title: t('common.profile'),
        }}
      />
    </CharityTab.Navigator>
  );
}
