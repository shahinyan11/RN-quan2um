import React from 'react';
import HeaderOrdersBar from '@screens/TradeView/AdditionCharting/components/HeaderOrdersBar';
import {useSelector} from 'react-redux';
import {selectOrderBook, selectPairCode} from '@store/tradeview';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Row from '@components/containers/Row';
import ItemBids from './ItemBids';
import ItemAsks from './ItemAsks';

/**
 * Orders bars
 */
const OrdersBar = () => {
  const pairCode = useSelector(selectPairCode);
  const orderBook = useSelector(selectOrderBook);

  const OrdersBids = () => {
    return (
      <View style={styles.container}>
        {orderBook.bids.map(item => (
          <ItemBids item={item} key={item.id.toString()} />
        ))}
      </View>
    );
  };

  const OrdersAsks = () => {
    return (
      <View style={styles.container}>
        {orderBook.ask.map(item => (
          <ItemAsks item={item} key={item.id.toString()} />
        ))}
      </View>
    );
  };

  return (
    <>
      <HeaderOrdersBar pairCode={pairCode} />
      <Row justifyContent="space-between">
        <OrdersBids />
        <OrdersAsks />
      </Row>
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: '49%',
    alignSelf: 'flex-start',
  },
});

export default OrdersBar;
