import React, {useEffect, useState, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleProp, TouchableOpacity} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';

const styles = EStyleSheet.create({
  containerStyle: {},
  titleStyle: {
    color: '$primaryMain',
    textTransform: 'uppercase',
    marginRight: 10,
  },
  disabledTitleStyle: {
    color: '$white25',
  },
});

interface IButtonSendProps {
  disabled?: boolean;
  timerDisabled?: boolean;
  onSubmit: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonSend = ({
  onSubmit,
  containerStyle,
  disabled = false,
  timerDisabled = true,
}: IButtonSendProps) => {
  const {t} = useTranslation();
  const [isDisabled, setDisabled] = useState(timerDisabled);
  const [isPressed, setIsPressed] = useState(false);

  const primaryMain = EStyleSheet.value('$primaryMain');

  const onPressSend = () => {
    onSubmit();
    setDisabled(true);
    setIsPressed(true);
  };

  useEffect(() => {
    let timerListener: any;
    if (isDisabled) {
      timerListener = setTimeout(() => {
        setDisabled(false);
      }, 120000);
    }

    return () => clearTimeout(timerListener);
  }, [isDisabled]);

  return (
    <Row containerStyle={[styles.containerStyle, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressSend}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Text
          type="btnSmall"
          style={[
            styles.titleStyle,
            (isDisabled || disabled) && styles.disabledTitleStyle,
          ]}>
          {isPressed || timerDisabled ? t('common.resend') : t('common.send')}
        </Text>
      </TouchableOpacity>

      {isDisabled && <ActivityIndicator size="small" color={primaryMain} />}
    </Row>
  );
};

export default memo(ButtonSend);
