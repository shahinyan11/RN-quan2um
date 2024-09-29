import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View} from 'react-native';

const st = EStyleSheet.create({
  boundingBox: {
    position: 'absolute',
    borderColor: 'green',
    borderWidth: 1,
  },
});

const TestFaceBounds = ({data, isFront, adjustRect}: any) => {
  return (
    <>
      {data?.map(({bounds}: any, index: number) => {
        const {left, ...others} = adjustRect(bounds);

        return (
          <View
            key={index}
            style={[
              st.boundingBox,
              {...others, [isFront ? 'right' : 'left']: left},
            ]}
          />
        );
      })}
    </>
  );
};

export default TestFaceBounds;
