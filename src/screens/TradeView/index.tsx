import React, {useCallback, useEffect, useRef, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'react-native';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import PickerPair from '@components/pickers/PickerPair';
import FormTradeView from '@components/forms/FormTradeView';
import OperationModal from '@components/other/OperationModal';
import ChartCandle from '@components/other/ChartCandle';

import styles from './styles';

import {
  getTradeViewChart,
  getTradeViewPair,
  getTradeViewPairs,
  onSetOrderBook,
  onUpdateChartData,
  onUpdatePair,
  selectLoading,
  selectPair,
  selectPairCode,
} from '@store/tradeview';

import OrderBookList from '@screens/TradeView/OrderBookList';
import {useFocusEffect} from '@react-navigation/native';
import Sockets from '@utils/sockets';
import useAppState from '@hooks/useAppState';
import Orders from '@screens/TradeView/Orders';
import eventEmitter from '@services/eventEmmiter';
import EVENTS from '@constants/events';

function TradeView({navigation, route}: StackScreenProps<any>) {
  const colorTitleSell = EStyleSheet.value('$red');
  const colorTitleBuy = EStyleSheet.value('$green');
  const appStateVisible = useAppState();
  const pair = useSelector(selectPair);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const appState = React.useRef(AppState.currentState);
  const pairCode = useSelector(selectPairCode);

  const [limitValue, setLimitValue] = useState('');
  const [marketValue, setMarketValue] = useState('');
  const [typeAction, setTypeAction] = useState('buy' as any);

  const [isChartVisible, setChartVisible] = useState(false);
  const [isOperationModalVisible, setOperationModalVisible] = useState(false);

  const [render, setRender] = useState(false);

  const tempDataPrices = useRef<any>({
    prices: null,
    graph: null,
    orderBook: null,
  });
  const updateTimer = useRef<any>(null);

  useEffect(() => {
    if (route.params?.typeAction) {
      setTypeAction(route.params.typeAction);
    }
  }, [route]);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        updateTimer.current = setInterval(update, 500);
        dispatch(getTradeViewPair(pairCode));
        Sockets.subscribes(`graph:${pairCode}`);
        Sockets.listen(`graph:${pairCode}`, ({data}) => {
          tempDataPrices.current.graph = data;
        });

        Sockets.subscribes(`prices:${pairCode}`);
        Sockets.listen(`prices:${pairCode}`, ({data}) => {
          tempDataPrices.current.prices = data;
        });

        Sockets.subscribes(`order_book:${pairCode}`);
        Sockets.listen(`order_book:${pairCode}`, ({data}) => {
          tempDataPrices.current.orderBook = data;
        });
      }

      return () => {
        Sockets.unsubscribes(`graph:${pairCode}`);
        Sockets.listenOff(`graph:${pairCode}`);

        Sockets.unsubscribes(`prices:${pairCode}`);
        Sockets.listenOff(`prices:${pairCode}`);

        Sockets.unsubscribes(`order_book:${pairCode}`);
        Sockets.listenOff(`order_book:${pairCode}`);

        clearInterval(updateTimer.current);
        tempDataPrices.current = {
          prices: null,
          graph: null,
          orderBook: null,
        };

        setLimitValue('');
        setMarketValue('');
      };
    }, [pairCode, appStateVisible]),
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
  };

  const onChangeVisibleChart = useCallback(() => {
    navigation.navigate('Chat');
    // setChartVisible(!isChartVisible)
  }, [isChartVisible]);

  const onChangeOperationModalVisible = useCallback(
    () => setOperationModalVisible(!isOperationModalVisible),
    [isOperationModalVisible],
  );

  const onChangePair = useCallback(
    () => navigation.navigate('TradeViewPairs'),
    [navigation],
  );

  const onSetDataFromGlass =
    (action: 'buy' | 'sell') =>
    ({
      limit,
      market,
    }: {
      limit: undefined | number;
      market: undefined | number;
    }) => {
      setLimitValue(limit?.toString());
      setMarketValue(market?.toString());
      setTypeAction(action);
    };

  const onAppStateUpdate = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(getTradeViewPair(pairCode));
        dispatch(getTradeViewPairs());
        dispatch(
          getTradeViewChart({
            pair: pairCode,
          }),
        );
      }

      appState.current = nextAppState;
    },
    [pairCode],
  );

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      onAppStateUpdate,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, [onAppStateUpdate]);

  useEffect(() => {
    dispatch(getTradeViewPair(pairCode));
    dispatch(getTradeViewPairs());
    dispatch(
      getTradeViewChart({
        pair: pairCode,
      }),
    );
    setRender(!render);
  }, [pairCode]);

  const onClear = () => {
    setLimitValue('');
    setMarketValue('');
  };

  useEffect(() => {
    onClear();
  }, [pairCode]);

  const onMomentumScrollEnd = () => eventEmitter.emit(EVENTS.LOAD_MORE);

  const openAddCharting = useCallback(() => {
    navigation.navigate('AdditionCharting');
  }, [navigation]);

  return (
    <SafeScrollContainer
      containerStyle={{paddingHorizontal: 20, paddingTop: 20}}
      loading={loading}
      onMomentumScrollEnd={onMomentumScrollEnd}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.topContainerStyle}>
        <PickerPair onPress={onChangePair} />
        <Row>
          <Icon
            disabled={false}
            size={16}
            name="chart-screen"
            containerStyle={styles.iconContainerStyle}
            onPress={onChangeVisibleChart}
          />
          <Icon
            size={16}
            name="chart-vertical"
            containerStyle={styles.iconContainerStyle}
            onPress={openAddCharting}
            disabled={false}
          />
          <Icon
            disabled={false}
            size={16}
            name="dots"
            containerStyle={[styles.iconContainerStyle, styles.endIconStyle]}
            onPress={onChangeOperationModalVisible}
          />
        </Row>
      </Row>

      <ChartCandle
        visible={isChartVisible}
        colorTitleBuy={colorTitleBuy}
        colorTitleSell={colorTitleSell}
      />

      <Row alignItems="flex-start">
        <FormTradeView
          valueLimit={limitValue}
          valueMarket={marketValue}
          setValueLimit={setLimitValue}
          setValueMarket={setMarketValue}
          action={typeAction}
          onSuccess={onClear}
        />
        <OrderBookList onSetDataFromGlass={onSetDataFromGlass} />
      </Row>
      <OperationModal
        visible={isOperationModalVisible}
        baseCurrency={pair.base_currency}
        mainCurrency={pair.main_currency}
        onClose={onChangeOperationModalVisible}
      />

      <Orders />
    </SafeScrollContainer>
  );
}

export default TradeView;
