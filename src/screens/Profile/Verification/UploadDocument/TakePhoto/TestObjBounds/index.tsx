import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const st = EStyleSheet.create({
  detectionFrame: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#00ff00',
    zIndex: 9,
  },
  detectionFrameLabel: {
    backgroundColor: 'rgba(0, 255, 0, 0.25)',
  },
});

const TestObjBounds = ({data}: any) => {
  return (
    <>
      {data?.map((obj: any) => {
        const {top, left, width, height, labels} = obj;

        return (
          <View style={[st.detectionFrame, {top, left, width, height}]}>
            <Text style={st.detectionFrameLabel}>
              {labels
                .map((label: any) => `${label.label} (${label.confidence})`)
                .join(',')}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default TestObjBounds;
