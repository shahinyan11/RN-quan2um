import React, {memo} from 'react';
import {
  ButtonProps,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {SvgProps} from '@components/icons/Icon/types';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import styles from './styles';

export interface IButtonProps extends ButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: SvgProps;
  withIcon?: boolean;
  iconRight?: SvgProps;
  type?: 'default' | 'cancel';
  uppercase?: boolean;
}

const Button = ({
  containerStyle,
  buttonContainerStyle,
  titleStyle,
  title,
  disabled,
  icon,
  iconRight,
  withIcon,
  onPress,
  type = 'default',
}: IButtonProps) => {
  const disabledColor = EStyleSheet.value('$white25');
  const isCancelType = type === 'cancel';
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable
        disabled={disabled}
        style={({pressed}) => {
          if (pressed) {
            return [
              styles.buttonContainerStyle,
              styles.buttonPressedContainerStyle,
              isCancelType && styles.buttonCancelContainerStyle,
              buttonContainerStyle,
            ];
          }
          return [
            styles.buttonContainerStyle,
            isCancelType && styles.buttonCancelContainerStyle,
            buttonContainerStyle,
            disabled && styles.buttonDisabledContainerStyle,
          ];
        }}
        onPressOut={onPress}>
        <Row>
          {withIcon && (
            <Icon
              name={icon?.name}
              color={disabled ? disabledColor : icon?.color}
              size={20}
              containerStyle={styles.iconContainerStyle}
            />
          )}
          <Text
            numberOfLines={1}
            type="btnRegular"
            style={[
              styles.titleStyle,
              isCancelType && styles.titleCancelStyle,
              titleStyle,
              disabled && styles.titleDisabledStyle,
            ]}>
            {title}
          </Text>
          {iconRight && (
            <Icon
              name={iconRight?.name}
              color={disabled ? disabledColor : iconRight?.color}
              size={20}
              containerStyle={styles.iconContainerStyle}
            />
          )}
        </Row>
      </Pressable>
    </View>
  );
};

export default memo(Button);
