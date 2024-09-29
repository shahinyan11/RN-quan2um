import React from 'react';

import {TextInput} from 'react-native';

import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import fonts from '@constants/fonts';
import increase from '@utils/increase';
import decrease from '@utils/decrease';

const styles = EStyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '$white10',
    height: scaledSize(50),
    marginVertical: scaledSize(8),
    borderRadius: scaledSize(8),
    paddingHorizontal: scaledSize(8),
    justifyContent: 'space-between',
  },
  inputStyle: {
    color: 'white',
    fontFamily: fonts.OSRegular,
    fontSize: scaledFontSize(12),
    flex: 1,
    textAlign: 'center',
  },
  iconContainerStyle: {
    margin: scaledSize(8),
  },
});

interface IInputWithActionProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const InputWithAction = ({
  placeholder,
  value,
  onChangeText,
}: IInputWithActionProps) => {
  const white25 = EStyleSheet.value('$white25');

  const onPressPlus = () => {
    try {
      const tempValue = increase(value);

      onChangeText(tempValue);
    } catch (e) {
      console.log('[ERROR]: Increasing value');
    }
  };

  const onPressMinus = () => {
    try {
      const newValue = decrease(value);

      if (+newValue >= 0) {
        onChangeText(newValue);
      }
    } catch (e) {
      console.log('[ERROR]: Decreasing value');
    }
  };
  return (
    <Row containerStyle={styles.inputContainerStyle}>
      <Icon disabled={false} name="minus" onPress={onPressMinus} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={white25}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
        keyboardType="numeric"
      />
      <Icon disabled={false} name="plus" onPress={onPressPlus} />
    </Row>
  );
};
