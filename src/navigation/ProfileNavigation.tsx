import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import Profile from '@screens/Profile';
import Support from '@screens/Profile/Support';
import Feedback from '@screens/Profile/Support/Feedback';
import SupportCenter from '@screens/Profile/Support/SupportCenter';
import Settings from '@screens/Profile/Settings';
import Language from '@screens/Profile/Settings/Language';
import AboutUs from '@screens/Profile/Settings/AboutUs';
import TermsOfUse from '@screens/Profile/Settings/TermsOfUse';
import TermsOfUseDetail from '@screens/Profile/Settings/TermsOfUse/TOUDetail';
import Questions from '@screens/Profile/Support/Questions';
import CommissionScreen from '@screens/Profile/CommissionScreen/CommissionScreen';

import SecurityNavigation from './SecurityNavigation';

import {ProfileOptions} from './config';
import AccountTypeScreen from '@screens/Profile/AccountTypeScreen/AccountTypeScreen';

const Stack = createStackNavigator();

function ProfileNavigation() {
  const {t} = useTranslation();
  const {cardStyle} = ProfileOptions();
  return (
    <Stack.Navigator screenOptions={ProfileOptions}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Security"
        component={SecurityNavigation}
        options={{
          headerShown: false,
          cardStyle: {
            ...cardStyle,
            paddingHorizontal: 0,
          },
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          title: t('common.support'),
        }}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{
          title: t('common.support_center'),
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          title: t('support.form_question_title'),
        }}
      />
      <Stack.Screen
        name="SupportCenter"
        component={SupportCenter}
        options={{
          title: t('common.support_center'),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: t('header.m_settings')}}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{title: t('common.m_language')}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: t('common.about'),
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          title: t('terms.terms_conditions'),
        }}
      />
      <Stack.Screen name="TermsOfUseDetail" component={TermsOfUseDetail} />
      <Stack.Screen
        name="CommissionScreen"
        component={CommissionScreen}
        options={{
          title: t('common.m_fee_trading'),
        }}
      />
      <Stack.Screen
        name="AccountTypeScreen"
        component={AccountTypeScreen}
        options={{
          title: t('account.title_account_type'),
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
