import React from 'react';
import {TouchableOpacity} from 'react-native';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import styles from './styles';

interface SItemMenuProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showIcon?: boolean;
}

const SItemMenu = ({
  title,
  subtitle,
  onPress,
  showIcon = true,
}: SItemMenuProps) => (
  <TouchableOpacity onPress={onPress}>
    <Row containerStyle={styles.containerStyle}>
      <Text>{title}</Text>
      <Row>
        <Text style={styles.subtitleStyle}>{subtitle}</Text>
        {showIcon && <Icon name="arrow-right" size={15} />}
      </Row>
    </Row>
  </TouchableOpacity>
);

export default SItemMenu;
