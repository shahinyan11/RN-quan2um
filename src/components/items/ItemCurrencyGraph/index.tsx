import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import ChartSmall from '@components/charts/ChartsSmall';
import ImageGradient from '@components/icons/ImageGradient';

import styles from './styles';

const ItemCurrencyGraph = ({
  main_currency,
  title,
  change_24,
  graph_data,
  last_price_face,
  onPress,
}: any) => {
  const greenColor = EStyleSheet.value('$green');
  const redColor = EStyleSheet.value('$red');

  const status = change_24 > 0 ? 1 : change_24 < 0 ? -1 : 0;

  const itemColor =
    status === 1 ? greenColor : status === -1 ? redColor : 'white';

  return (
    <TouchableOpacity
      style={styles.containerStyle}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.topContainerStyle}>
        <ImageGradient
          url={main_currency.logo_png}
          colors={[
            main_currency.color_hex || 'transparent',
            main_currency.color_hex2 || 'transparent',
          ]}
          iconContainerStyle={styles.iconContainerStyle}
          onPress={onPress}
        />
        <ChartSmall
          data={graph_data}
          colorStroke={main_currency.color_hex}
          colorFill={main_currency.color_hex2}
        />
      </View>
      <Row
        justifyContent="space-between"
        containerStyle={styles.bottomContainerStyle}>
        <Row>
          <Text type="btnSmall" style={styles.currencyStyle}>
            {title}
            <Text type="btnSmall"> {last_price_face}</Text>
          </Text>
        </Row>
        <Row>
          {Boolean(status) && (
            <Icon
              name="trade-arrow"
              color={itemColor}
              size={20}
              containerStyle={
                status === -1 && styles.iconDecreaseContainerStyle
              }
            />
          )}
          <Text
            type="btnSmall"
            style={[styles.trendingProcentStyle, {color: itemColor}]}>
            {change_24}%
          </Text>
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default memo(ItemCurrencyGraph);
