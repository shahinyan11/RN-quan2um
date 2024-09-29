import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import {Ask} from '@store/tradeview/types';

import styles from './styles';
import {useTranslation} from 'react-i18next';

interface ItemGlassProps extends Ask {
  colorTitle: string;
  colorChart: string;
  onPressPrice: () => void;
  onPressQuantity: () => void;
}

interface IGlassProps {
  type: 'sell' | 'buy';
  showAll: boolean;
  data: Ask[];
  codePrice: string;
  codeQuantity: string;
  colorLabel: string;
  colorChart: string;
  onPress: ({
    limit,
    market,
  }: {
    limit: undefined | number;
    market: undefined | number;
  }) => void;
}

const ItemGlass = memo(
  ({
    p,
    id,
    q,
    pr,
    colorTitle,
    colorChart,
    onPressPrice,
    onPressQuantity,
  }: ItemGlassProps) => (
    <Row
      key={id.toString()}
      justifyContent="space-between"
      containerStyle={styles.itemContainerStyle}>
      <TouchableOpacity onPress={onPressPrice}>
        <Text type="textSmall" style={{color: colorTitle}}>
          {p}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressQuantity}>
        <Text type="textSmall">{q}</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.progressBarStyle,
          {width: `${pr}%`, backgroundColor: colorChart},
        ]}
      />
    </Row>
  ),
);

const Glass = ({
  type,
  data,
  codePrice,
  codeQuantity,
  colorLabel,
  colorChart,
  showAll,
  onPress,
}: IGlassProps) => {
  const {t} = useTranslation();
  const scrollView = useRef<ScrollView>(null);
  const renderItem = (item: Ask, index: number) => {
    const onPressPrice = () => {
      onPress({limit: item.p, market: undefined});
    };

    const onPressQuantity = () => {
      onPress({limit: item.p, market: item.q});
    };

    return (
      <ItemGlass
        key={index.toString()}
        {...item}
        colorTitle={colorLabel}
        colorChart={colorChart}
        onPressPrice={onPressPrice}
        onPressQuantity={onPressQuantity}
      />
    );
  };

  useEffect(() => {
    if (showAll && type === 'sell') {
      scrollView.current?.scrollToEnd({animated: true});
    }
  }, [showAll, type]);

  const getOrders = useCallback(() => {
    if (type === 'sell' && data.length > 19) {
      return data.slice(0, -(data.length - 10)).sort((a, b) => {
        return b.p - a.p;
      });
    }

    return data.slice(0, 10);
  }, [data, type]);

  return (
    <View>
      <Row justifyContent="space-between">
        <Text type="textMini" style={styles.labelStyle}>
          {`${t('common.price')} (${codePrice})`}
        </Text>
        <Text type="textMini" style={styles.labelStyle}>
          {`${t('common.total')} (${codeQuantity})`}
        </Text>
      </Row>

      {showAll ? (
        <ScrollView
          ref={scrollView}
          showsVerticalScrollIndicator={false}
          style={styles.containerStyle}>
          {data.map(renderItem)}
        </ScrollView>
      ) : (
        getOrders().map(renderItem)
      )}
    </View>
  );
};

export default memo(Glass);
