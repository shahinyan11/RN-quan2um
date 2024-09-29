import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import SignIn from '@screens/Auth/SignIn';
import SignUp from '@screens/Auth/SignUp';
// import SignIn from '@screens/AuthNew/SignIn';
// import SignUp from '@screens/AuthNew/SignUp';
import Auth from '@screens/Auth';
import VerificationEmail from '@screens/Auth/SignUp/VerificationEmail';

import ResetPassword from '@screens/Auth/ResetPassword';
import Verification from '@screens/Auth/ResetPassword/Verification';
import EnterPassword from '@screens/Auth/ResetPassword/EnterPassword';

import ButtonRight from './components/ButtonRight';

import {AuthOptions, authScreenOptions} from './config';
import TermsOfUseDetail from '@screens/Profile/Settings/TermsOfUse/TOUDetail';

const Stack = createStackNavigator();

function AuthNavigation() {
  const {t} = useTranslation();
  const navigateTo = (navigation: any, screenName: string) => () => {
    navigation.navigate(screenName);
  };
  return (
    <Stack.Navigator screenOptions={authScreenOptions}>
      <Stack.Screen name="Auth" component={Auth} options={AuthOptions} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={({navigation}) => {
          return {
            title: t('auth.signin'),
            headerRight: () => (
              <ButtonRight
                title={t('auth.signup')}
                onPress={navigateTo(navigation, 'SignUp')}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({navigation}) => {
          return {
            title: t('auth.signup'),
            headerRight: () => (
              <ButtonRight
                title={t('auth.signin')}
                onPress={navigateTo(navigation, 'SignIn')}
              />
            ),
          };
        }}
      />
      <Stack.Screen name="SUVerificationEmail" component={VerificationEmail} />
      <Stack.Screen name="RPResetPassword" component={ResetPassword} />
      <Stack.Screen name="RPVerification" component={Verification} />
      <Stack.Screen name="RPEnterPassword" component={EnterPassword} />
      <Stack.Screen name="TermsOfUseDetail" component={TermsOfUseDetail} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
