import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import SafeContainer from '@components/containers/SafeContainer';
import SItemMenu from '@components/items/SItemMenu';
import Button from '@components/buttons/Button';

import {checkUrlValidity, selectAppStore, selectLanguage} from '@store/app';
import {onLogout} from '@store/auth';
import {
  checkFCMSubscribe,
  onFCMSubscribe,
  onFCMUnsubscribe,
} from '@store/account';
import {getFcmToken} from '@utils/notif';

import styles from './styles';
import ItemMenu from '@components/items/ItemMenu';
import useAppState from '@hooks/useAppState';
import {selectNotificationSettings} from '@store/account/selectors';
import Loader from '@components/other/Loader';
import InputText from '@components/inputs/InputText';
import Switcher from '@components/switcher/Switch';

function Settings({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const appState = useAppState();
  const notificationStatus = useSelector(selectNotificationSettings);
  const [awardNotificationStatus, setAwardNotificationStatus] = useState(true);
  const language = useSelector(selectLanguage);
  const redColor = EStyleSheet.value('$red');
  const [notificationStatusSettings, setNSSettings] = useState(false);
  const [mirror, setMirror] = useState('');
  const {baseUrl} = useSelector(selectAppStore);
  const loading = useSelector(store => store.account.loading);

  useEffect(() => {
    (async () => {
      const authStatus = await messaging().hasPermission();

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        setNSSettings(true);
      } else {
        setNSSettings(false);
        if (!notificationStatusSettings && notificationStatus) {
          await setPushStatus(false);
        }
      }
    })();
  }, [appState, notificationStatus, notificationStatusSettings]);

  useEffect(() => {
    setMirror(baseUrl);
  }, [baseUrl]);

  const checkSubscribe = useCallback(() => {
    (async () => {
      const token = await getFcmToken();
      dispatch(checkFCMSubscribe(token));
    })();
  }, []);

  useEffect(() => {
    checkSubscribe();
  }, []);

  const navigateTo = (screenName: string) => () => {
    navigation.navigate(screenName);
  };

  const onSuccess = () => dispatch(onLogout());

  const onPressLogout = () => {
    if (notificationStatus) {
      getFcmToken().then(token => {
        dispatch(onFCMUnsubscribe(token, onSuccess));
        messaging().deleteToken().then();
      });
    } else {
      onSuccess();
    }
  };

  const setPushStatus = useCallback(
    (isSubscribe: boolean) => {
      (async () => {
        const token = await getFcmToken();
        if (!isSubscribe) {
          dispatch(onFCMUnsubscribe(token, checkSubscribe));
        } else {
          await dispatch(onFCMSubscribe(token));
          checkSubscribe();
        }
      })();
    },
    [notificationStatus],
  );

  const onChangeNotificationStatus = async () => {
    if (notificationStatusSettings) {
      await setPushStatus(!notificationStatus);
    } else {
      await Linking.openSettings();
    }
  };

  const onChangeAwardNotificationStatus = async () => {
    setAwardNotificationStatus(!awardNotificationStatus);
  };

  const handleInputChange = url => {
    setMirror(url);
  };

  const handleOnSave = () => {
    dispatch(checkUrlValidity({url: mirror, onSuccess: () => onPressLogout()}));
  };

  const saveButtonRender = () => {
    return (
      <Pressable onPress={handleOnSave}>
        <Text style={styles.save}>Save</Text>
      </Pressable>
    );
  };

  return (
    <SafeContainer>
      <View style={styles.mainContainerStyle}>
        <View>
          <SItemMenu
            title={t('common.m_language')}
            subtitle={language.title}
            onPress={navigateTo('Language')}
          />
          <InputText
            label={t('common.own_mirror')}
            value={mirror}
            labelStyle={styles.label}
            addAfter={baseUrl !== mirror ? saveButtonRender() : null}
            onChangeText={handleInputChange}
          />

          <ItemMenu
            icon="bell"
            withRightIcon={false}
            title={t('mailing.system_notifications')}
            onPress={() => {}}
            containerStyle={styles.itemContainerStyle}>
            <View style={styles.checkboxContainer}>
              {loading ? (
                <Loader size="small" />
              ) : (
                <Switcher
                  active={notificationStatus}
                  onPress={onChangeNotificationStatus}
                />
              )}
            </View>
          </ItemMenu>
          <ItemMenu
            icon="bell"
            withRightIcon={false}
            title={t('mailing.award_notifications')}
            onPress={() => {}}
            containerStyle={styles.itemContainerStyle}>
            <View style={styles.checkboxContainer}>
              <Switcher
                active={awardNotificationStatus}
                onPress={onChangeAwardNotificationStatus}
              />
            </View>
          </ItemMenu>
        </View>

        <View>
          <SItemMenu
            title={t('common.about')}
            onPress={navigateTo('AboutUs')}
          />
        </View>
      </View>
      <Button
        iconRight={{name: 'logout', color: redColor}}
        title={t('auth.logout')}
        titleStyle={styles.btnTitleStyle}
        buttonContainerStyle={styles.btnLogoutStyle}
        onPress={onPressLogout}
      />
    </SafeContainer>
  );
}

export default Settings;
