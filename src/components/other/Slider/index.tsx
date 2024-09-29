import React, {memo, useState, useCallback} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  View,
  ScrollView,
  Image,
} from 'react-native';

import Row from '@components/containers/Row';

import {Slide} from '@store/pages/types';
import {scaledSize} from '@utils/scaledSize';

import sliderStyles from './styles';

const {width} = Dimensions.get('window');

const Slider = ({data}: {data?: Slide[]}) => {
  const [currentPageIndex, setCurrentPage] = useState(0);

  const onChangePage = ({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
    const pageIndex = Math.round(
      nativeEvent.contentOffset.x / (width - scaledSize(32)),
    );
    setCurrentPage(pageIndex);
  };

  const Pagination = useCallback(
    () => (
      <Row
        justifyContent="center"
        containerStyle={sliderStyles.paginationContainerStyle}>
        {data?.map((slide, index) => (
          <View
            key={slide.id}
            style={
              index === currentPageIndex
                ? sliderStyles.activePageStyle
                : sliderStyles.inactivePageStyle
            }
          />
        ))}
      </Row>
    ),
    [currentPageIndex, data],
  );
  if (!data.length) {
    return null;
  }

  return (
    <View style={sliderStyles.containerStyle}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        horizontal
        onMomentumScrollEnd={onChangePage}>
        {data?.map(slide => (
          <View key={slide.id} style={sliderStyles.imageContainerStyle}>
            <Image
              source={{uri: slide.photo}}
              style={sliderStyles.imageStyle}
              resizeMode="stretch"
            />
          </View>
        ))}
      </ScrollView>

      <Pagination />
    </View>
  );
};

export default memo(Slider);
