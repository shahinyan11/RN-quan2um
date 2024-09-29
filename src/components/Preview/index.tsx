import React from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from 'react-native';
import Video from 'react-native-video';

import {Exchange, Trash} from '@assets/svgs';
import st from './styles';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  type?: 'video' | 'image';
  data: {
    uri?: string;
    name?: string;
    resolution?: string;
    size?: string | number;
  };
  onDelete: () => void;
  onChange: () => void;
}

export default function Preview({
  containerStyle,
  type = 'image',
  data,
  onDelete,
  onChange,
}: Props) {
  return (
    <View style={[st.container, containerStyle]}>
      {type === 'video' && (
        <Video
          source={{uri: data.uri}}
          style={st.preview}
          resizeMode={'stretch'}
        />
      )}
      {type === 'image' && (
        <Image source={{uri: data.uri}} style={st.preview} />
      )}
      <View style={st.textBox}>
        <Text numberOfLines={1} style={{width: '65%'}}>
          {data.name}
        </Text>
        <Text>
          {data.resolution}, {data.size} kb
        </Text>
      </View>
      <View style={st.iconBox}>
        <Exchange style={st.mr12} onPress={onChange} />
        <Trash onPress={onDelete} />
      </View>
    </View>
  );
}
