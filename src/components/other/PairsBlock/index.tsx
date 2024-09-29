import React, {memo} from 'react';
import {FlatList, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import ItemPairs from '@components/items/ItemPairs';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import EmptyList from '@components/containers/EmptyList';

import {Pair} from '@store/tradeview/types';
import {stylesGlobal} from '@constants/globalStyles';

import styles from './styles';

export const PairBlockHeader = ({
  labelLeft,
  labelCenter,
  labelRight,
}: {
  labelLeft: string;
  labelCenter: string;
  labelRight: string;
}) => (
  <Row
    justifyContent="space-between"
    containerStyle={styles.headerPairsContainerStyle}>
    <View style={styles.columnStyle}>
      <Text type="tTiny" style={styles.titleStyle}>
        {labelLeft}
      </Text>
    </View>

    <Text type="tTiny" textAlign="center" style={styles.titleStyle}>
      {labelCenter}
    </Text>

    <Text type="tTiny" textAlign="right" style={styles.titleStyle}>
      {labelRight}
    </Text>
  </Row>
);

interface IPairsBlockProps {
  data?: Pair[];
  onPress: (pair: string) => void;
}

export const PairsBlockMap = memo(({data, onPress}: IPairsBlockProps) => {
  const renderPair = (item: Pair) => {
    const onPressPair = () => onPress(item.pair);

    return (
      <ItemPairs
        key={item.pair_id.toString()}
        {...item}
        onPress={onPressPair}
      />
    );
  };

  return (
    <>
      {!data?.length && <EmptyList />}

      {data?.map(renderPair)}
    </>
  );
});

const PairsBlock = ({data}: IPairsBlockProps) => {
  const {t} = useTranslation();

  const renderItemPair = ({item}: {item: Pair}) => <ItemPairs {...item} />;

  return (
    <>
      <PairBlockHeader
        labelLeft={t('common.pair')}
        labelCenter={t('common.last_price')}
        labelRight={t('common.volume')}
      />
      <View style={stylesGlobal.fullScale}>
        <FlatList
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItemPair}
          keyExtractor={item => item.pair_id.toString()}
          contentContainerStyle={stylesGlobal.contentContainerStyle}
          ListEmptyComponent={EmptyList}
        />
      </View>
    </>
  );
};

export default memo(PairsBlock);
