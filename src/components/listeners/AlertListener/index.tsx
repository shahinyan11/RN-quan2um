import React, {memo, useCallback, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils/scaledSize';

import {
  onClearMessage,
  selectMessage,
  selectMessageVisible,
  setMessageVisible,
} from '@store/app';

import styles from './styles';

const AlertListener = () => {
  const alert = useSelector(selectMessage);
  const isAlertVisible = useSelector(selectMessageVisible);

  const {title, message, type} = alert;

  const dispatch = useDispatch();

  const green = EStyleSheet.value('$green');
  const red = EStyleSheet.value('$red');
  const yellow = EStyleSheet.value('$yellow');
  const dark = EStyleSheet.value('$darkBackground');

  const alertColor =
    type === 'alert' ? yellow : type === 'success' ? green : red;

  const onHideAlert = useCallback(() => {
    dispatch(onClearMessage());

    dispatch(setMessageVisible(false));
  }, [dispatch]);

  useEffect(() => {
    if (isAlertVisible && Platform.OS === 'android') {
      StatusBar.setBackgroundColor(alertColor);
    } else if (!isAlertVisible && Platform.OS === 'android') {
      StatusBar.setBackgroundColor(dark);
    }
  }, [isAlertVisible, alertColor, dark]);

  const styleOfAlert = useCallback(() => {
    return type === 'alert'
      ? styles.alertStyle
      : type === 'success'
      ? styles.successStyle
      : styles.errorStyle;
  }, [type]);

  if (!isAlertVisible) return null;

  return (
    <View style={[styles.mainContainerStyle, styleOfAlert()]}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={onHideAlert}
          style={styles.alertContainerStyle}>
          <Row>
            <Icon
              name={type}
              size={scaledSize(20)}
              containerStyle={styles.iconContainerStyle}
            />
            <Text numberOfLines={1} type="t3">
              {title}
            </Text>
          </Row>
          <View style={styles.messageContainerStyle}>
            <Text type="textSmall">{message}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default memo(AlertListener);
