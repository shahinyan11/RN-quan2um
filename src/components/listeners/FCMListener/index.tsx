import React, {memo, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

const FCMListener = () => {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState(
    {} as FirebaseMessagingTypes.RemoteMessage,
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setMessageVisible(true);
      setMessage(remoteMessage);
      setTimeout(() => {
        setMessageVisible(false);
        setMessage({});
      }, 5000);
    });

    return unsubscribe;
  }, []);

  return (
    <Modal
      isVisible={isMessageVisible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationOutTiming={600}
      animationInTiming={600}
      useNativeDriver
      style={styles.windowContainerStyle}
      backdropOpacity={0}>
      <SafeAreaView>
        <View style={styles.notificationContainerStyle}>
          <Row containerStyle={stylesGlobal.flexOne}>
            <Icon name="bell" size={20} />
            <Text type="t6" numberOfLines={1} style={stylesGlobal.flexOne}>
              {message.notification?.title}
            </Text>
          </Row>
          <Text
            type="textSmall"
            style={styles.descriptionStyle}
            numberOfLines={2}>
            {message.notification?.body}
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(FCMListener);
