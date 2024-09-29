import React, {useEffect, useRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import {Event} from './types';
import st from './styles';
import {EXCHANGE_TYPES} from '@constants/index';
import {Bank} from '@assets/svgs/others';

type Props = {
  value?: string;
  type: 'card' | 'phone' | 'email' | 'iban';
  onChange: (val: string) => void;
  disabled?: boolean;
};

const ExchangeTypeField = ({
  value = '',
  type,
  onChange,
  disabled = false,
}: Props) => {
  const inputRef = useRef<TextInput>(null);

  const {placeholder, mask} = EXCHANGE_TYPES[type];

  useEffect(
    () => {
      onChange('');
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placeholder],
  );

  const handleChange = ({nativeEvent: {text}}: Event) => {
    text = text.toUpperCase().replace(/ /g, '');

    onChange(text);
  };

  const handleClick = () => {
    inputRef?.current?.focus();
  };

  return (
    <Pressable style={st.container} onPress={handleClick}>
      <Bank size={41} />
      <View style={st.inputContainer}>
        <TextInputMask
          style={st.text}
          value={value}
          type={'custom'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(255,255,255, 0.5)'}
          options={{mask}}
          onChange={handleChange}
          keyboardType={type !== 'iban' ? 'default' : 'numeric'}
          editable={!disabled}
        />
      </View>
    </Pressable>
  );
};

export default ExchangeTypeField;
