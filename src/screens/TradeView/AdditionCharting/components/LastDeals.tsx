import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectPair, selectPairCode} from '@store/tradeview';
import EmptyList from '@components/containers/EmptyList';
import Header from './Header';
import ItemDeal from './ItemDeal';

/**
 * Last deals tab
 */
const LastDeals = () => {
  const pairCode = useSelector(selectPairCode);
  const pair = useSelector(selectPair);

  return (
    <View>
      <Header pairCode={pairCode} />
      {pair.deals ? (
        pair.deals.map((item: any) => (
          <ItemDeal item={item} key={item.id.toString()} />
        ))
      ) : (
        <EmptyList />
      )}
    </View>
  );
};

export default LastDeals;
