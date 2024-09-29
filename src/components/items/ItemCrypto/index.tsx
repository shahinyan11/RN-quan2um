import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import ImageGradient from '@components/icons/ImageGradient';
import Text from '@components/textes/Text';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

interface IItemCrypto {
  id: number;
  title: string;
  subtitle: string;
  balanceFiat: string;
  balance: string;
  colors: string[];
  icon: string;
  onPressItem: () => void;
}

const ItemCrypto = ({
  title,
  subtitle,
  balance,
  balanceFiat,
  colors,
  icon,
  onPressItem,
}: IItemCrypto) => {
  return (
    <TouchableOpacity onPress={onPressItem}>
      <ContainerItem>
        <Row>
          <ImageGradient
            url={icon}
            colors={colors}
            containerStyle={styles.iconContainerStyle}
          />

          <View style={stylesGlobal.mainContainerStyle}>
            <Row
              justifyContent="space-between"
              containerStyle={stylesGlobal.mainContainerStyle}>
              <Text type="t4" style={styles.titleStyle}>
                {title}
              </Text>
              <Row>
                <Text type="t4">{balance}</Text>
                <Icon
                  name="arrow-right"
                  size={12}
                  containerStyle={styles.arrowContainerStyle}
                />
              </Row>
            </Row>
            <Row
              justifyContent="space-between"
              containerStyle={stylesGlobal.mainContainerStyle}>
              <Text type="textSmall" style={styles.subtitleStyle}>
                {subtitle}
              </Text>
              <Text type="textSmall" style={styles.subtitleStyle}>
                $ {balanceFiat}
              </Text>
            </Row>
          </View>
        </Row>
      </ContainerItem>
    </TouchableOpacity>
  );
};

export default memo(ItemCrypto);
