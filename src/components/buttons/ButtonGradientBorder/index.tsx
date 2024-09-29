import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GradientBorder from '@components/GradientBorder';
import st from './styles';

type Props = {
  text: string;
  onPress: () => void;
};

const ButtonGradientBorder = ({text, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GradientBorder borderRadius={5}>
        <View
          style={{
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={st.text}>{text}</Text>
        </View>
      </GradientBorder>
    </TouchableOpacity>
  );
};

export default ButtonGradientBorder;
