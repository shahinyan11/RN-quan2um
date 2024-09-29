import React, {useMemo} from 'react';
import {StyleProp, Text, View} from 'react-native';

import {IconShare, IconStar} from '@assets/svgs';
import st from './styles';
import {useSelector} from 'react-redux';
import {selectPair} from '@store/tradeview';
import {ViewStyle} from 'react-native-extended-stylesheet';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  pairCode: string;
};

function ChartHeader({containerStyle, pairCode}: Props) {
  const {
    max_price_face,
    min_price_face,
    main_volume_face,
    main_currency,
    last_price_face,
    deals,
    change,
  } = useSelector(selectPair);

  const isUp = useMemo(() => deals?.[0]?.is_buy, [deals]);

  return (
    <View style={containerStyle}>
      <View style={st.row}>
        <View style={st.pareContainer}>
          <Text style={st.pare}>
            {pairCode.toUpperCase().replace('_', '/')}
          </Text>
          <Text style={st.fluctuation}>{change}%</Text>
        </View>
        <View style={st.iconContainer}>
          <IconStar />
          <IconShare style={st.shareIcon} />
        </View>
      </View>
      <View style={st.priceInfo}>
        <Text style={isUp ? st.currentPriceUp : st.currentPriceDown}>
          {last_price_face}
        </Text>
        <View>
          <View style={st.row}>
            <Text style={st.label}>МАКС. 24Ч</Text>
            <Text style={st.value}>{max_price_face}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.label}>МИН. 24Ч</Text>
            <Text style={st.value}>{min_price_face}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.label}>Оборот за 24ч</Text>
            <Text style={st.value}>
              {main_volume_face}
              {main_currency.code}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ChartHeader;
