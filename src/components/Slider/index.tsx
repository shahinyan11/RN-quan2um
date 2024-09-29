import React, {useRef, useState} from 'react';
import {Image, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import getImageUrl from '@utils/getFullUrl';
import Pagination from '@components/Slider/Pagination';
import st from './styles';

const Slider = ({data = []}) => {
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressValue = useSharedValue<number>(0);

  return (
    <View>
      <Carousel
        ref={carouselRef}
        loop
        width={SCREEN_WIDTH}
        height={300}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={setCurrentIndex}
        pagingEnabled={true}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({item}) => {
          return (
            <Image
              source={{uri: getImageUrl(item.file)}}
              style={{height: '100%'}}
            />
          );
        }}
      />
      <View style={st.dotesRow}>
        {data.map((_, index) => (
          <Pagination
            index={index}
            key={index}
            animValue={progressValue}
            length={data.length}
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;
