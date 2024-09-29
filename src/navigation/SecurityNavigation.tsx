import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import Security from '@screens/Profile/Security';
import ChangePassword from '@screens/Profile/Security/ChangePassword';
import Devices from '@screens/Profile/Security/Devices';
import AccountDeactivation from '@screens/Profile/Security/AccountDeactivation';
import PasswordSecurity from '@screens/Profile/Security/PasswordSecurity';
import AccountConnectPhone from '@screens/Profile/Security/AccountConnectPhone';
import VerificationPhone from '@screens/Profile/Security/VerificationPhone';

import {SecurityOptions} from './config';

import {selectIsSocialAccount} from '@store/auth';

import {SecurityNavigation as SNavigation} from './config/types';

const Stack = createStackNavigator<SNavigation>();

export default function SecurityNavigation() {
  const {t} = useTranslation();
  const isSocial = useSelector(selectIsSocialAccount);
  return (
    <Stack.Navigator screenOptions={SecurityOptions}>
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          title: t('common.security'),
          headerTitleAlign: 'left',
        }}
      />
      {!isSocial && (
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: t('change_pass.modal_form_title'),
            headerTitleAlign: 'left',
          }}
        />
      )}

      <Stack.Screen
        name="PasswordSecurity"
        component={PasswordSecurity}
        options={{title: t('common.m_application_password')}}
      />

      <Stack.Screen
        name="AccountConnectPhone"
        component={AccountConnectPhone}
        options={{
          title: t('common.add_phone'),
        }}
      />
      <Stack.Screen
        name="VerificationPhone"
        component={VerificationPhone}
        options={{
          title: t('account.m_verif_phone_number'),
        }}
      />
      <Stack.Screen
        name="Devices"
        component={Devices}
        options={{
          title: t('common.devices'),
        }}
      />
      {/* {!isSocial && ( */}
      <Stack.Screen
        name="AccountDeactivation"
        component={AccountDeactivation}
        options={{
          title: t('common.deactivate'),
        }}
      />
      {/* )} */}
      {/* <Stack.Screen
        name="AccountActivities"
        component={AccountActivities}
        options={{
          title: t('accountActivities'),
        }}
      /> */}
    </Stack.Navigator>
  );
}
