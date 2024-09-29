import React, {memo, useCallback} from 'react';

import {Image, Pressable, StyleProp} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(44),
    height: scaledSize(44),
    borderRadius: scaledSize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    flex: 1,
    height: null,
    width: null,
  },
  containerStyle: {},
});

interface IImageGradientProps {
  url?: string;
  colors?: string[];
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const ImageGradient = ({
  url,
  colors = ['#FFFFFF', '#FFFFFF'],
  iconContainerStyle,
  iconStyle,
  disabled,
  onPress,
  iconSize = 20,
  containerStyle,
}: IImageGradientProps) => {
  const imageStyle = useCallback(() => {
    return {
      width: scaledSize(iconSize),
      height: scaledSize(iconSize),
    };
  }, [iconSize]);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.containerStyle, containerStyle]}>
      <LinearGradient
        style={[styles.iconContainerStyle, iconContainerStyle]}
        colors={colors}>
        {Boolean(url) && (
          <Image
            source={{uri: url}}
            style={[imageStyle(), iconStyle]}
            resizeMode="contain"
          />
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default memo(ImageGradient);
