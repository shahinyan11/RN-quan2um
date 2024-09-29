import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Divider from '@components/Divider';
import ImageGradient from '@components/icons/ImageGradient';

import styles from './styles';

import {Pair} from '@store/tradeview/types';
import {scaledSize} from '@utils/scaledSize';

interface ItemPairsProps extends Pair {
  onPress?: () => void;
}

const ItemPairs = ({
  title,
  last_price_face,
  base_currency,
  main_currency,
  volume_24_face,
  onPress = () => {},
}: ItemPairsProps) => {
  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={onPress}
      activeOpacity={0.7}>
      <Row>
        <Row containerStyle={styles.leftColumnStyle}>
          <ImageGradient
            iconSize={scaledSize(15)}
            url={main_currency.logo_png}
            colors={[main_currency.color_hex, main_currency.color_hex]}
            iconContainerStyle={styles.iconLeftContainerStyle}
          />

          <ImageGradient
            iconSize={scaledSize(15)}
            url={base_currency.logo_png}
            colors={[base_currency.color_hex, base_currency.color_hex]}
            iconContainerStyle={styles.iconRightContainerStyle}
            containerStyle={styles.rightContainerStyle}
          />

          <Text type="btnSmall" style={styles.textStyle}>
            {title}
          </Text>
        </Row>

        <Text type="btnSmall" style={styles.textStyle} textAlign="center">
          {last_price_face}
        </Text>

        <Text type="btnSmall" style={styles.textStyle} textAlign="right">
          {volume_24_face}
        </Text>
      </Row>
      <Divider containerStyle={styles.dividerStyle} />
    </TouchableOpacity>
  );
};

export default memo(ItemPairs);
