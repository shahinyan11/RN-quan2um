import React, {useEffect, useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainerRef} from '@react-navigation/core';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainNavigation from './MainNavigation';

import AlertListener from '@components/listeners/AlertListener';
import FCMListener from '@components/listeners/FCMListener';
import PasswordSecureScreen from '@components/other/PasswordSecureScreen';

import {selectIsAuth, selectUser} from '@store/auth';
import {
  onLoadLanguages,
  selectAppStore,
  selectIsAppPasswordSet,
  selectTfaSkipped,
  setBaseUrl,
} from '@store/app';
import DowntimeScreen from '@screens/Auth/DowntimeScreen/DowntimeScreen';
import Sockets from '@utils/sockets';
import useIsShowPassScreen from '@hooks/useIsShowPassScreen';
import useAppState from '@hooks/useAppState';
import ModalRoot from '@components/ModalRoot';
import Config from 'react-native-config';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '$darkBackground',
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export const navigationRef = React.createRef<NavigationContainerRef>();
export const isReadyRef = React.createRef();

function AppNavigation() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {baseUrl} = useSelector(selectAppStore);
  const isAppPasswordSet = useSelector(selectIsAppPasswordSet);
  const {isDowntime} = useSelector(store => store.auth);
  const {ws_access_token, tfa_enabled} = useSelector(selectUser);
  const tfaSkipped = useSelector(selectTfaSkipped);
  const appState = useAppState();

  const [isPasswordSecureScreenVisible, setIsPasswordSecureVisible] =
    useState(isAppPasswordSet);

  const isShowPassScreen = useIsShowPassScreen();

  useEffect(() => {
    if (!baseUrl) {
      dispatch(setBaseUrl(Config.BASE_URL));
    }
  }, [baseUrl]);

  useEffect(() => {
    if (appState === 'active') {
      Sockets.init();
      Sockets.login(ws_access_token);
      dispatch(onLoadLanguages());

      setIsPasswordSecureVisible(isAppPasswordSet);
    }
  }, [appState]);

  useEffect(() => {
    const screen =
      // isAuth && !tfa_enabled && !tfaSkipped ? 'GTFANavigation' : 'Chat';
      isAuth && !tfa_enabled && !tfaSkipped ? 'GTFANavigation' : 'Main';
    navigationRef.current?.navigate(screen);
  }, [tfa_enabled, tfaSkipped, isAuth]);

  if (isAppPasswordSet && isPasswordSecureScreenVisible && isShowPassScreen) {
    return <PasswordSecureScreen onSuccess={setIsPasswordSecureVisible} />;
  }

  if (isDowntime) {
    return <DowntimeScreen />;
  }

  return (
    <>
      <MainNavigation />
      <FCMListener />

      {appState !== 'active' && <BlurView style={styles.blurViewStyle} />}
      <ModalRoot />
      <AlertListener />
    </>
  );
}

export default AppNavigation;
