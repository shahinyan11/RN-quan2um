import React, {memo, useState} from 'react';
import {Pressable, StyleProp, TextStyle, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import styles from './styles';

import {IButtonProps} from '../Button';

interface IButtonGradientProps extends IButtonProps {
  gradientColors?: string[];
  gradientColorsPressed?: string[];
  disabledGradientColors?: string[];
  disableGradientLinear?: boolean;
  disableType?: 'opacity' | 'gray';
  disabledTitleStyleLinear?: StyleProp<TextStyle>;
  children?: any;
}

const ButtonGradient = ({
  containerStyle,
  buttonContainerStyle,
  titleStyle,
  gradientColors = ['#1CDEEC', '#0080FF'],
  gradientColorsPressed = ['#1FC5D1', '#0069D1'],
  disabledGradientColors = ['#949494', '#636363'],
  disableGradientLinear,
  disabledTitleStyleLinear,
  title,
  withIcon,
  icon,
  disabled,
  onPress,
  uppercase = true,
  disableType = 'gray',
  children,
}: IButtonGradientProps) => {
  const [isPressed, setPressed] = useState(false);

  const onPressIn = () => {
    setPressed(true);
  };

  const onPressOut = () => {
    setPressed(false);
  };

  const disabledColor = EStyleSheet.value('$white5');
  const disabledTitleColor = EStyleSheet.value('$white25');
  const _disabledGradientColors = disableGradientLinear
    ? disabledGradientColors
    : [disabledColor, disabledColor];

  return (
    <View
      style={[
        styles.containerStyle,
        {opacity: disabled && disableType === 'opacity' ? 0.5 : 1},
        containerStyle,
      ]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            disabled && disableType !== 'opacity'
              ? _disabledGradientColors
              : isPressed
              ? gradientColorsPressed
              : gradientColors
          }
          style={[styles.buttonContainerStyle, buttonContainerStyle]}>
          {!children ? (
            <View style={styles.buttonStyle}>
              {withIcon && (
                <Icon
                  name={icon?.name}
                  color={disabled ? disabledTitleColor : icon?.color}
                  containerStyle={styles.iconContainerStyle}
                />
              )}
              <Text
                type="btnRegular"
                style={[
                  styles.titleStyle,
                  !uppercase ? {textTransform: 'none'} : null,
                  titleStyle,
                  disabled && disableType !== 'opacity'
                    ? styles.disabledTitleStyle
                    : null,
                  disabledTitleStyleLinear && disabledTitleStyleLinear,
                ]}>
                {title}
              </Text>
            </View>
          ) : (
            children
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default memo(ButtonGradient);
