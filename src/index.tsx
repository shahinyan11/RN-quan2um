import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorBoundary from 'react-native-error-boundary';
import * as Sentry from '@sentry/react-native';
import messaging from '@react-native-firebase/messaging';
import {isPinOrFingerprintSet} from 'react-native-device-info';
import JailMonkey from 'jail-monkey';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';
import codePush from 'react-native-code-push';

import ErrorComponent from '@components/other/ErrorComponent';
import Loader from '@components/other/Loader';
import SecureScreen from '@components/other/SecureScreen';

import i18n from './i18n';

import AppNavigation, {isReadyRef, navigationRef} from './navigation';

import {initThemes} from './themes';

import {persistore, store} from './store';
import {globalInterceptor} from '@api';

import {requestUserPermission} from '@utils/notif';
//import useCheckAppVersion from '@hooks/useCheckAppVersion';
import {AppsFlyerInit, AppsFlyerOnInstall} from '@utils/appsflyer';
import {hideModal, showModal} from '@store/modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161524',
  },
});

i18n.init().then();

initThemes();
LogBox.ignoreLogs(['Setting a timer']);

if (!__DEV__) {
  Sentry.init({
    // dsn: Config.SENTRY_DNS,
    dsn: 'https://75f18e819f504b6c8431787a4256b8df@o4505200070492160.ingest.sentry.io/4505200074555392',
    tracesSampleRate: 1.0,
  });
}

if (__DEV__) {
  import('../ReactotronConfig').then(() =>
    console.log('Reactotron Configured.'),
  );
}

const App = () => {
  const {ready} = useTranslation();
  const [isDeviceSecure, setIsDeviceSecure] = useState(true);
  const [isNetEnabled, setNetEnabled] = useState(true);
  const [secureStatus, setSecureStatus] = useState({
    isRooted: false,
    isOnExternalStorage: false,
    isPinEnabled: true,
  });
  //const [isNeedUpdate] = useCheckAppVersion();

  globalInterceptor(store);

  useEffect(() => {
    let initTimer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const isPinEnabled = await isPinOrFingerprintSet();
      const isRooted = JailMonkey.isJailBroken();
      const isOnExternalStorage = JailMonkey.isOnExternalStorage();

      setSecureStatus({
        isPinEnabled,
        isRooted,
        isOnExternalStorage,
      });

      setIsDeviceSecure(!isRooted && isPinEnabled);
    })();
  }, []);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setNetEnabled(offline);

      if (!state.isConnected) {
        // (async () => {
        //   await i18n.init();
        // })();
        store.dispatch(
          showModal({
            modalType: 'NO_INTERNET',
          }),
        );
      } else {
        store.dispatch(hideModal());
      }
    });

    return () => removeNetInfoSubscription();
  }, [isNetEnabled]);

  // AppsFlyer initialization!
  useEffect(() => {
    AppsFlyerInit();

    const isFirstLaunch = AppsFlyerOnInstall();

    if (isFirstLaunch) {
      // do something if first install
      console.log('First launch');
    } else {
      console.log('Not first launch!');
    }
  }, []);

  // if (isNeedUpdate) {
  //   return <NeedUpdateApp />;
  // }

  // if (isNetEnabled) {
  //   return <NoInternet />;
  // }

  if (!isDeviceSecure && !__DEV__) {
    return <SecureScreen {...secureStatus} />;
  }

  if (!ready) {
    return (
      <View style={styles.containerStyle}>
        <Loader size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Provider store={store}>
          <PersistGate persistor={persistore}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                isReadyRef.current = true;
              }}>
              <AppNavigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

const AppContainer = Sentry.wrap(App);

requestUserPermission().then();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  // useEffect(() => {
  //   codePush.restartApp(true);
  // }, []);

  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <AppContainer />;
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
const HeadlessCheckContainer = codePush(codePushOptions)(HeadlessCheck);

export default __DEV__ ? HeadlessCheck : HeadlessCheckContainer;
