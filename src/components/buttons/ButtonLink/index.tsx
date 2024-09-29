import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import styles from './styles';

import {IButtonProps} from '../Button';

interface IButtonLinkProps extends IButtonProps {
  type?: 'default' | 'label';
}

const ButtonLink = ({
  title,
  onPress,
  containerStyle,
  buttonContainerStyle,
  titleStyle,
  disabled,
  type = 'default',
  withIcon = false,
  icon,
}: IButtonLinkProps) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonContainerStyle, buttonContainerStyle]}
      onPress={onPress}>
      {withIcon && <Icon {...icon} />}
      <Text
        type={type === 'default' ? 'btnSmall' : 'tTiny'}
        style={[
          styles.titleStyle,
          titleStyle,
          disabled && styles.disabledTitleStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default memo(ButtonLink);
