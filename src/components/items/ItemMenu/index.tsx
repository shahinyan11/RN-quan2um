import React, {ComponentType, memo} from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

import ContainerItem from '@components/containers/ContainerItem';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import {IconsList} from '@components/icons/Icon/types';
import Icon from '@components/icons/Icon';

import styles from './styles';
import {scaledSize} from '@utils/scaledSize';
import LinearGradient from 'react-native-linear-gradient';

interface IItemMenuProps {
  title: string;
  subtitle?: string;
  icon?: IconsList;
  withRightIcon?: boolean;
  rightIcon?: {
    name: IconsList;
    color?: string;
    size?: number;
  };
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  IconComponent?: ComponentType;
}

const ItemMenu = ({
  title,
  subtitle,
  icon,
  withRightIcon = false,
  rightIcon = {name: 'arrow-right', size: scaledSize(20)},
  onPress,
  containerStyle,
  children,
  IconComponent,
}: IItemMenuProps) => {
  return (
    <ContainerItem
      disabled={false}
      onPress={onPress}
      containerStyle={containerStyle}>
      <Row justifyContent="space-between">
        {IconComponent && (
          <LinearGradient
            style={styles.iconContainerStyle}
            colors={['rgba(28, 161, 105, 0.30)', 'rgba(28, 161, 105, 0.00)']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}>
            <IconComponent />
          </LinearGradient>
        )}
        {icon && (
          <Icon
            name={icon}
            size={20}
            containerStyle={styles.iconContainerStyle}
          />
        )}
        <View style={styles.titleContainerStyle}>
          <Text>{title}</Text>
          {Boolean(subtitle) && <Text type="hint">{subtitle}</Text>}
        </View>
        {withRightIcon && <Icon {...rightIcon} />}
        {children}
      </Row>
    </ContainerItem>
  );
};

export default memo(ItemMenu);
