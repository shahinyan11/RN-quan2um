import React, {memo} from 'react';
import {View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Text from '@components/textes/Text';

import styles from './styles';

interface IInputCode {
  value: string;
  onChangeText: (value: string) => void;
  cellCount?: number;
}

const InputCode = ({value, onChangeText, cellCount = 6}: IInputCode) => {
  const ref = useBlurOnFulfill({value, cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChangeText,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      caretHidden={false}
      value={value}
      onChangeText={onChangeText}
      cellCount={cellCount}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <View
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          <Text style={styles.textStyle}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

export default memo(InputCode);
