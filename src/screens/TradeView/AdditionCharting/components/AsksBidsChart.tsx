import React, {useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {useWindowDimensions, View} from 'react-native';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDeepChartPair,
  selectDeepChart,
  selectPairCode,
} from '@store/tradeview';
import formatNumber from '@utils/formatNumber';

const CHART_CONTAINER_STYLE = {
  paddingTop: 5,
  paddingRight: 0,
};

/**
 * Charts asks and bids
 */
const AsksBidsChart = () => {
  const dispatch = useDispatch();
  const pairCode = useSelector(selectPairCode);
  const deepChart = useSelector(selectDeepChart);
  const {width} = useWindowDimensions();

  const background = EStyleSheet.value('$darkBackground');
  const red = EStyleSheet.value('$red');
  const green = EStyleSheet.value('$green');

  useEffect(() => {
    dispatch(getDeepChartPair(pairCode));
  }, [pairCode]);

  if (deepChart.bids.length < 3 || deepChart.asks.length < 3) {
    return null;
  }

  const chartDataBids = {
    0: deepChart.bids[0],
    1: deepChart.bids[(deepChart.bids.length / 2).toFixed()],
    2: deepChart.bids[deepChart.bids.length - 1],
  };

  const chartDataAsks = {
    0: deepChart.asks[0],
    1: deepChart.asks[(deepChart.asks.length / 2).toFixed()],
    2: deepChart.asks[deepChart.asks.length - 1],
  };

  return (
    <Row>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: deepChart?.bids.map(item => item.agg_count),
              strokeWidth: 1,
            },
          ],
        }}
        width={width / 2 - 10} // from react-native
        height={150}
        chartConfig={{
          color: () => green,
          fillShadowGradient: green,
          fillShadowGradientOpacity: 1,
          backgroundGradientFrom: background,
          backgroundGradientTo: background,
        }}
        bezier
        withDots={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        style={CHART_CONTAINER_STYLE}
      />
      <View style={styles.bidsLabel}>
        <Text type="label">{formatNumber(chartDataBids[0].agg_count)}</Text>
        <Text type="label">{formatNumber(chartDataBids[1].agg_count)}</Text>
        <Text type="label">{formatNumber(chartDataBids[2].agg_count)}</Text>
      </View>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: deepChart?.asks.map(item => item.agg_count),
              strokeWidth: 1,
            },
          ],
        }}
        width={width / 2 - 10} // from react-native
        height={150}
        chartConfig={{
          color: () => red,
          fillShadowGradient: red,
          fillShadowGradientOpacity: 1,
          backgroundGradientFrom: background,
          backgroundGradientTo: background,
        }}
        bezier
        withDots={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        style={CHART_CONTAINER_STYLE}
      />
      <View style={styles.asksLabel}>
        <Text type="label" textAlign="right">
          {formatNumber(chartDataAsks[2].agg_count)}
        </Text>
        <Text type="label" textAlign="right">
          {formatNumber(chartDataAsks[1].agg_count)}
        </Text>
        <Text type="label" textAlign="right">
          {formatNumber(chartDataAsks[0].agg_count)}
        </Text>
      </View>
      <Row justifyContent="space-between" containerStyle={styles.price}>
        <Text type="label">{formatNumber(chartDataBids[0].price)}</Text>
        <Text type="label">{formatNumber(chartDataBids[1].price)}</Text>
        <Text type="label">{formatNumber(chartDataBids[2].price)}</Text>
        <Text type="label">{formatNumber(chartDataAsks[0].price)}</Text>
        <Text type="label">{formatNumber(chartDataAsks[1].price)}</Text>
        <Text type="label">{formatNumber(chartDataAsks[2].price)}</Text>
      </Row>
    </Row>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 10,
  },
  asksLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '80%',
    justifyContent: 'space-between',
  },
  bidsLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '80%',
    justifyContent: 'space-between',
  },
  price: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
});

export default AsksBidsChart;
