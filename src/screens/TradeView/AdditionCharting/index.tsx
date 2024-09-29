import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ButtonLink from '@components/buttons/ButtonLink';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTradeViewChart,
  onSetOrderBook,
  onUpdateChartData,
  onUpdatePair,
  selectPair,
  selectPairCode,
  onUpdateDeepChart,
  selectDealPair,
  updateDealPair,
} from '@store/tradeview';
import ChartCandle from '@components/other/ChartCandle';
import PairInfo from './components/PairInfo';
import PickerModal from '@components/pickers/PickerModal';
import useTConstants from '@hooks/useTConstants';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import OrdersTabs from './components/OrdersTabs';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Sockets from '@utils/sockets';
import ButtonsBuySell from './components/ButtonsBuySell';
import useAppState from '@hooks/useAppState';
import {scaledSize} from '@utils/scaledSize';

/**
 * Addition charting screen
 * @param navigation
 */
const AdditionCharting = ({navigation}: any) => {
  const {t} = useTranslation();
  const {INTERVALS} = useTConstants();
  const appStateVisible = useAppState();
  const colorTitleSell = EStyleSheet.value('$red');
  const colorTitleBuy = EStyleSheet.value('$green');
  const pair = useSelector(selectPair);
  const dealPair = useSelector(selectDealPair);
  const pairCode = useSelector(selectPairCode);
  const [interval, setIntervals] = useState(INTERVALS[1]);
  const [isFocused, setFocused] = useState(false);

  const dispatch = useDispatch();
  const focused = useIsFocused();

  const tempDataPrices = useRef<any>({
    prices: null,
    graph: null,
    orderBook: null,
    deepChart: null,
    deals: [],
  });
  const updateTimer = useRef<any>(null);

  const ButtonRight = () => {
    const onPress = () => {
      navigation.navigate('Orders');
    };

    return (
      <ButtonLink
        title={t('common.orders')}
        onPress={onPress}
        containerStyle={styles.headerRightContainerStyle}
      />
    );
  };

  useEffect(() => {
    dispatch(
      getTradeViewChart({
        pair: pairCode,
        timeEnd: new Date(),
        interval: interval.value,
      }),
    );
  }, [interval]);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        setIntervals(INTERVALS[1]);
        updateTimer.current = setInterval(update, 500);
        Sockets.subscribes(`graph:${pairCode}`);
        Sockets.listen<any>(`graph:${pairCode}`, ({data}) => {
          tempDataPrices.current.graph = data;
        });

        Sockets.subscribes(`prices:${pairCode}`);
        Sockets.listen<any>(`prices:${pairCode}`, ({data}) => {
          tempDataPrices.current.prices = data;
        });

        Sockets.subscribes(`order_book:${pairCode}`);
        Sockets.listen<any>(`order_book:${pairCode}`, ({data}) => {
          tempDataPrices.current.orderBook = data;
        });

        Sockets.subscribes(`deep_chart:${pairCode}`);
        Sockets.listen<any>(`deep_chart:${pairCode}`, ({data}) => {
          tempDataPrices.current.deepChart = data;
        });

        Sockets.subscribes(`deals:${pairCode}`);
        Sockets.listen<any>(`deals:${pairCode}`, ({data}) => {
          tempDataPrices.current.deals.unshift({
            code: pairCode,
            fee_value: data.fv,
            id: data.id,
            is_buy: data.isb,
            pair: data.pair,
            price: data.p,
            price_face: data.pf,
            quantity: data.q,
            side_name: data.sn,
            time: data.t,
            volume: data.v,
            volume_face: data.vf,
          });
        });
        setFocused(focused);
      }

      return () => {
        Sockets.unsubscribes(`graph:${pairCode}`);
        Sockets.listenOff(`graph:${pairCode}`);

        Sockets.unsubscribes(`prices:${pairCode}`);
        Sockets.listenOff(`prices:${pairCode}`);

        Sockets.unsubscribes(`order_book:${pairCode}`);
        Sockets.listenOff(`order_book:${pairCode}`);

        Sockets.unsubscribes(`deep_chart:${pairCode}`);
        Sockets.listenOff(`deep_chart:${pairCode}`);

        Sockets.unsubscribes(`deals:${pairCode}`);
        Sockets.listenOff(`deals:${pairCode}`);
        setFocused(focused);

        clearInterval(updateTimer.current);
        tempDataPrices.current = {
          prices: null,
          graph: null,
          orderBook: null,
          deepChart: null,
          deals: [],
        };
      };
    }, [pairCode, isFocused, appStateVisible, focused]),
  );

  const update = () => {
    if (tempDataPrices.current.prices) {
      dispatch(onUpdatePair(tempDataPrices.current.prices));
      tempDataPrices.current.prices = null;
    }
    if (tempDataPrices.current.graph) {
      dispatch(onUpdateChartData(tempDataPrices.current.graph));
      tempDataPrices.current.graph = null;
    }
    if (tempDataPrices.current.orderBook) {
      dispatch(onSetOrderBook(tempDataPrices.current.orderBook));
      tempDataPrices.current.orderBook = null;
    }
    if (tempDataPrices.current.deepChart) {
      dispatch(onUpdateDeepChart(tempDataPrices.current.deepChart));
      tempDataPrices.current.deepChart = null;
    }
    if (tempDataPrices.current.deals.length) {
      dispatch(updateDealPair(tempDataPrices.current.deals));
      tempDataPrices.current.deals = [];
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ButtonRight,
    });
  });

  const handleSetInterval = useCallback(
    (obj: any) => {
      setIntervals(obj);
    },
    [pairCode],
  );

  return (
    <>
      <SafeScrollContainer>
        <PairInfo pair={pair} dealPair={dealPair} />
        <PickerModal
          data={INTERVALS}
          value={interval}
          onPress={handleSetInterval}
        />
        <ChartCandle
          visible={true}
          colorTitleBuy={colorTitleBuy}
          colorTitleSell={colorTitleSell}
        />
        <OrdersTabs />
      </SafeScrollContainer>
      <ButtonsBuySell />
    </>
  );
};

const styles = EStyleSheet.create({
  containerHeader: {
    paddingVertical: 10,
  },
  pairDropdown: {
    flexDirection: 'row',
  },
  headerRightContainerStyle: {
    marginRight: scaledSize(12),
  },
});

export default AdditionCharting;
