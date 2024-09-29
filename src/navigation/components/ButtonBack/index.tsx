import React from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackHeaderLeftButtonProps} from '@react-navigation/stack';

import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props extends StackHeaderLeftButtonProps {
  iconColor?: string;
}

const ButtonBack = (props: Props) => {
  const {canGoBack, onPress, iconColor} = props;
  const white50 = EStyleSheet.value('$white50');
  return (
    <View>
      {canGoBack && (
        <Pressable onPress={onPress}>
          <View style={styles.containerStyle}>
            <Icon
              name="arrow-left"
              color={iconColor || white50}
              size={20}
              onPress={onPress}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default ButtonBack;
