import React from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import styles from './styles';
import {Currency} from '@store/account/types';
import ImageGradient from '@components/icons/ImageGradient';
import {scaledSize} from '@utils/scaledSize';

interface ItemCurrencyProps extends Currency {
  onPress: () => void;
  isSelected: boolean;
}

const ItemCurrency = ({
  name,
  slug,
  logo_png,
  color_hex,
  color_hex2,
  onPress,
  isSelected,
}: ItemCurrencyProps) => {
  const primaryMain = EStyleSheet.value('$primaryMain');

  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.itemContainerStyle}>
        <Row>
          <ImageGradient
            iconSize={scaledSize(12)}
            url={logo_png}
            colors={[color_hex, color_hex2]}
            iconContainerStyle={styles.iconContainerStyle}
          />

          <Text type="btnRegular" style={styles.titleStyle}>
            {slug}
          </Text>
          <Text style={styles.subtitleStyle}>{name}</Text>
        </Row>
        {isSelected && (
          <Icon
            name="check"
            size={15}
            color={primaryMain}
            containerStyle={styles.checkContainerStyle}
          />
        )}
      </Row>
    </TouchableOpacity>
  );
};

export default React.memo(ItemCurrency);
