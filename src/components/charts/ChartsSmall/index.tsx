import React from 'react';
import {View} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import {LineChart} from 'react-native-chart-kit';

import {GraphDaum} from '@store/pages/types';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    height: scaledSize(40),
    width: scaledSize(150),
    borderRadius: 5,
    backgroundColor: '$darkBackground',
    paddingTop: 5,
    overflow: 'hidden',
  },
});

const CHART_CONTAINER_STYLE = {
  paddingTop: 5,
  paddingRight: 3,
  borderRadius: 5,
  marginTop: -5,
};

const ChartSmall = ({
  data = [],
  colorStroke,
  colorFill,
}: {
  data: GraphDaum[];
  colorStroke: string;
  colorFill: string;
}) => {
  const backgroundColor = EStyleSheet.value('$darkBackground');

  const graphData = data?.map(item => +item.price);

  return (
    <View>
      {data.length ? (
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: graphData,
                strokeWidth: 1,
              },
            ],
          }}
          width={scaledSize(150)} // from react-native
          height={scaledSize(40)}
          chartConfig={{
            color: () => colorStroke,
            fillShadowGradient: colorFill,
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
          }}
          bezier
          withDots={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withInnerLines={false}
          withOuterLines={false}
          style={CHART_CONTAINER_STYLE}
        />
      ) : (
        <View style={styles.containerStyle} />
      )}
    </View>
  );
};

export default ChartSmall;
