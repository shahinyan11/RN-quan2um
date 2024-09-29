import React, {useState} from 'react';
import PickerModal from '@components/pickers/PickerModal';
import Glass from '@components/other/Glass';
import Column from '@components/containers/Column';
import GlassInfo from './GlassInfo';
import EStyleSheet from 'react-native-extended-stylesheet';
import useTConstants from '@hooks/useTConstants';
import {useSelector} from 'react-redux';
import {selectOrderBook, selectPair} from '@store/tradeview';

const OrderBookList = ({onSetDataFromGlass}: any) => {
  const colorChartBuy = EStyleSheet.value('$green25');
  const colorChartSell = EStyleSheet.value('$red25');
  const colorTitleSell = EStyleSheet.value('$red');
  const colorTitleBuy = EStyleSheet.value('$green');

  const {ORDERS_LIST} = useTConstants();
  const [order, setOrder] = useState(ORDERS_LIST[0]);
  const orderBook = useSelector(selectOrderBook);
  const pair = useSelector(selectPair);

  return (
    <Column>
      <PickerModal data={ORDERS_LIST} value={order} onPress={setOrder} />
      {order.value !== 'all' && (
        <GlassInfo
          last_price={pair.last_price}
          last_price_face={pair.last_price_face}
          last_price_fiat_face={pair.last_price_fiat_face}
        />
      )}
      {(order.value === 'all' || order.value === 'sell') && (
        <Glass
          type="sell"
          showAll={order.value === 'sell'}
          data={orderBook.ask}
          codePrice={pair.base_currency.code}
          codeQuantity={pair.main_currency.code}
          colorLabel={colorTitleSell}
          colorChart={colorChartSell}
          onPress={onSetDataFromGlass('sell')}
        />
      )}
      {order.value === 'all' && (
        <GlassInfo
          last_price={pair.last_price}
          last_price_face={pair.last_price_face}
          last_price_fiat_face={pair.last_price_fiat_face}
        />
      )}
      {(order.value === 'all' || order.value === 'buy') && (
        <Glass
          type="buy"
          showAll={order.value === 'buy'}
          data={orderBook.bids}
          codePrice={pair.base_currency.code}
          codeQuantity={pair.main_currency.code}
          colorLabel={colorTitleBuy}
          colorChart={colorChartBuy}
          onPress={onSetDataFromGlass('buy')}
        />
      )}
    </Column>
  );
};

export default OrderBookList;
