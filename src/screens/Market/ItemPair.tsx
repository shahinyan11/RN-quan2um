import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import ImageGradient from '@components/icons/ImageGradient';
import Text from '@components/textes/Text';

import {Pair} from '@store/tradeview/types';
import {scaledSize} from '@utils/scaledSize';

import {pairStyle} from './styles';
import cutToDote from '@utils/cutToDote';

export const Header = React.memo(() => {
  const {t} = useTranslation();
  return (
    <Row justifyContent="space-between" containerStyle={pairStyle.head}>
      <Row containerStyle={pairStyle.leftBlockContainerStyle}>
        <Text style={pairStyle.titleStyle}>{t('common.pair')}</Text>
      </Row>
      <View style={pairStyle.centerBlockContainerStyle}>
        <Text style={pairStyle.titleStyle}>{t('common.last_price')}</Text>
      </View>
      <View style={pairStyle.centerBlockContainerStyle}>
        <Text textAlign="center" style={pairStyle.titleStyle}>
          {t('common.change_24')}
        </Text>
      </View>
      <View style={pairStyle.rightBlockContainerStyle}>
        <Text style={pairStyle.titleStyle}>{t('common.volume_24')}</Text>
      </View>
    </Row>
  );
});

interface IItemPairProps extends Pair {
  onPress: () => void;
}

const ItemPair = ({
  main_currency,
  base_currency,
  title,
  last_price_face,
  volume_24_face,
  change_24,
  onPress,
}: IItemPairProps) => {
  const changeColor =
    change_24 > 0
      ? EStyleSheet.value('$green')
      : change_24 < 0
      ? EStyleSheet.value('$red')
      : 'white';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Row
        justifyContent="space-between"
        containerStyle={pairStyle.containerStyle}>
        <Row containerStyle={pairStyle.leftBlockContainerStyle}>
          <ImageGradient
            url={main_currency.logo_png}
            colors={[main_currency.color_hex, main_currency.color_hex2]}
            iconSize={scaledSize(15)}
            iconContainerStyle={pairStyle.leftIconContainerStyle}
          />
          <ImageGradient
            url={base_currency.logo_png}
            colors={[base_currency.color_hex, base_currency.color_hex2]}
            iconSize={scaledSize(15)}
            iconContainerStyle={pairStyle.rightIconContainerStyle}
            containerStyle={pairStyle.rightContainerStyle}
          />
          <Text type="btnSmall" style={pairStyle.pairTitleStyle}>
            {title}
          </Text>
        </Row>
        <View style={pairStyle.centerBlockContainerStyle}>
          <Text style={pairStyle.textStyle}>{last_price_face}</Text>
        </View>
        <View style={pairStyle.centerBlockContainerStyle}>
          <Text style={[pairStyle.textStyle, {color: changeColor}]}>
            {change_24}
          </Text>
        </View>
        <View style={pairStyle.rightBlockContainerStyle}>
          <Text style={pairStyle.textStyle}>{cutToDote(volume_24_face)}</Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default React.memo(ItemPair);
