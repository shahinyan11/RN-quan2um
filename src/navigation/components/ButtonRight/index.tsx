import React, {memo} from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';

interface IButtonAction {
  title: string;
  onPress: () => void;
}

import {scaledSize} from '@utils/index';

const styles = EStyleSheet.create({
  containerStyle: {
    marginRight: scaledSize(16),
  },
  labelStyle: {
    color: '#09AAFF',
  },
});

const ButtonRight = ({title, onPress}: IButtonAction) => {
  return (
    <Pressable onPress={onPress} style={styles.containerStyle}>
      <Text type="textRegular" style={styles.labelStyle}>
        {title}
      </Text>
    </Pressable>
  );
};

export default memo(ButtonRight);
