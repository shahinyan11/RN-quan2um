import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsksBidsChart from './AsksBidsChart';
import BlockBuySell from './BlockBuySell';
import OrdersBar from './OrdersBar';

/**
 * Orders book tab with chart
 */
const OrdersBook = () => {
  return (
    <View style={styles.container}>
      <AsksBidsChart />
      <BlockBuySell />
      <OrdersBar />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default OrdersBook;
