import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

import Text from '@components/textes/Text';

import {TextType} from '../Text';

import styles from './styles';

interface ILinkProps {
  title: string;
  onPress?: () => void;
  type?: TextType;
  linkStyle?: StyleProp<TextStyle>;
}

const Link = ({title, onPress, type = 'textMiddle', linkStyle}: ILinkProps) => (
  <Text type={type} onPress={onPress} style={[styles.linkStyle, linkStyle]}>
    {title}
  </Text>
);

export default Link;
