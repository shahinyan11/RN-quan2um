import React, {memo} from 'react';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';

import {IconsList} from '@components/icons/Icon/types';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';

import styles from './styles';

interface IButtonDarkProps {
  icon: {name: IconsList; size: number};
  title?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonDark = ({
  icon = {name: 'usd', size: 16},
  title,
  onPress,
  containerStyle,
}: IButtonDarkProps) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable onPress={onPress} style={styles.btnContainerStyle}>
        <Icon
          name={icon.name}
          size={icon.size}
          containerStyle={styles.iconContainerStyle}
        />
        {title && (
          <Text type="btnMini" style={styles.titleStyle}>
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default memo(ButtonDark);
