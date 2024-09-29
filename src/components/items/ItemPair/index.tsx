import React, {memo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ImageGradient from '@components/icons/ImageGradient';

import {ITVPairIcons} from '@store/tradeview';

import {scaledSize} from '@utils/scaledSize';

import styles from './styles';

const DEFAULT_BG_ICON_COLOR = 'rgba(255,255,255, 0.1)';

interface ItemPairProps extends ITVPairIcons {
  name: string;
  change: number;
  onPress: () => void;
}

const ItemPair = ({
  name,
  change,
  onPress,
  base_currency,
  base_color_hex = DEFAULT_BG_ICON_COLOR,
  base_color_hex2 = DEFAULT_BG_ICON_COLOR,
  main_currency,
  main_color_hex = DEFAULT_BG_ICON_COLOR,
  main_color_hex2 = DEFAULT_BG_ICON_COLOR,
}: ItemPairProps) => {
  const colorChange = useCallback(() => {
    if (change < 0) {
      return EStyleSheet.value('$red');
    } else {
      return EStyleSheet.value('$green');
    }
  }, [change]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.itemContainerStyle}>
        <Row>
          <ImageGradient
            iconSize={scaledSize(15)}
            url={main_currency}
            colors={[main_color_hex, main_color_hex2]}
            iconContainerStyle={styles.iconLeftContainerStyle}
          />

          <ImageGradient
            iconSize={scaledSize(15)}
            url={base_currency}
            colors={[base_color_hex, base_color_hex2]}
            iconContainerStyle={styles.iconRightContainerStyle}
            containerStyle={styles.rightContainerStyle}
          />
        </Row>
        <Row containerStyle={styles.mainContainerStyle}>
          <Text type="btnSmall">{name}</Text>
          <Text style={{color: colorChange()}}>{`${change}%`}</Text>
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default memo(ItemPair);
