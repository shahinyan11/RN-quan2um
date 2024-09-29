import React, {useRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Text from '@components/textes/Text';
import {Props} from './types';
import st from './styles';
import {scaledSize} from '@utils/scaledSize';
import sliceDecimals from '@utils/sliceDecimals';

export default function ExchangeCurrency({
  title,
  onChange,
  value = '',
  editable = true,
  data,
}: Props) {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={handleFocus} style={st.container}>
      <Text type={'description'} style={st.title}>
        {title}
      </Text>
      <View style={st.row}>
        <View style={st.left}>
          <SvgUri
            width={scaledSize(36)}
            height={scaledSize(36)}
            style={st.icon}
            uri={data?.logo_slug}
          />
          <View>
            <View style={st.row}>
              <Text type="t3">{data?.code}</Text>
            </View>
            <Text type={'description'}>{data?.name}</Text>
          </View>
        </View>
        <View style={st.right}>
          <TextInput
            ref={inputRef}
            onChange={onChange}
            value={sliceDecimals(`${value}`, data?.decimals)}
            placeholder={'0'}
            placeholderTextColor={'white'}
            keyboardType={'decimal-pad'}
            style={st.input}
            editable={editable}
          />
          {/*<Text type={'description'}>$60,84</Text>*/}
        </View>
      </View>
    </Pressable>
  );
}
