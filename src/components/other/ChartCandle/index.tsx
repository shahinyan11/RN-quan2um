import React, {memo, useCallback} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';

import {
  VictoryAxis,
  VictoryBar,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

import {formatDate} from '@utils/fns';

import {selectChartDataSet} from '@store/tradeview';
import {scaledSize} from '@utils/scaledSize';

interface ICandlestick {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

const ChartCandle = ({
  colorTitleSell,
  colorTitleBuy,
  visible,
}: {
  visible: boolean;
  colorTitleSell: string;
  colorTitleBuy: string;
}) => {
  const chartDataSet = useSelector(selectChartDataSet);

  const {width, height} = useWindowDimensions();

  const min = useCallback(() => {
    try {
      return chartDataSet.reduce(function (prev, curr) {
        return prev.low < curr.low ? prev : curr;
      });
    } catch (e) {
      return {low: 0};
    }
  }, [chartDataSet]);

  const max = useCallback(() => {
    try {
      return chartDataSet.reduce(function (prev, curr) {
        return prev.volume > curr.volume ? prev : curr;
      });
    } catch (e) {
      return {
        volume: 0,
      };
    }
  }, [chartDataSet]);

  const MAX_VALUE_OF_VOLUME = max().volume;

  const LOW_VALUE = min().low - (MAX_VALUE_OF_VOLUME + 50);

  if (!visible) {
    return null;
  }

  return (
    <>
      <VictoryChart
        height={height * 0.3}
        width={width}
        domainPadding={{x: 5, y: 5}}
        theme={VictoryTheme.material}
        padding={{
          left: 0,
          bottom: 0,
          top: 0,
          right: scaledSize(80),
        }}
        containerComponent={<VictoryZoomContainer allowZoom={false} />}>
        <VictoryAxis
          orientation="right"
          dependentAxis
          style={{
            axis: {strokeWidth: 0},
            axisLabel: {fontSize: 9},
            grid: {strokeWidth: 0},
            ticks: {strokeWidth: 0},
            tickLabels: {fontSize: 9},
          }}
        />
        <VictoryCandlestick
          standalone={false}
          x={(t: ICandlestick) => {
            return t.time;
          }}
          candleColors={{positive: colorTitleBuy, negative: colorTitleSell}}
          data={chartDataSet}
        />
      </VictoryChart>

      <VictoryChart
        height={height * 0.15}
        width={width}
        domainPadding={{x: 5, y: 5}}
        theme={VictoryTheme.material}
        padding={{
          left: 0,
          bottom: scaledSize(50),
          top: 0,
          right: scaledSize(80),
        }}
        containerComponent={<VictoryZoomContainer allowZoom={false} />}>
        <VictoryAxis
          orientation="right"
          dependentAxis
          style={{
            axis: {strokeWidth: 0},
            axisLabel: {fontSize: 9},
            grid: {strokeWidth: 0},
            ticks: {strokeWidth: 0},
            tickLabels: {fontSize: 9},
          }}
        />
        <VictoryAxis
          style={{
            axis: {strokeWidth: 0},
            axisLabel: {fontSize: 9},
            grid: {strokeWidth: 0},
            ticks: {strokeWidth: 0},
            tickLabels: {fontSize: 9},
          }}
          tickFormat={t => {
            return formatDate(t, 'hh');
          }}
        />
        <VictoryBar
          barRatio={0.5}
          style={{
            data: {
              fill: ({datum}) => datum.fill,
            },
          }}
          standalone={true}
          data={chartDataSet.map(item => {
            return {
              x: item.time,
              y: +LOW_VALUE + +item.volume,
              y0: LOW_VALUE,
              fill: item.close > item.open ? colorTitleBuy : colorTitleSell,
            };
          })}
        />
      </VictoryChart>
    </>
  );
};

export default memo(ChartCandle);
