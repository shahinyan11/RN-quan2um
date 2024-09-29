import React, {useRef} from 'react';
import Cup from './Cup';
import ChartHeader from './ChartHeader';
import st from './styles';
import WebView from 'react-native-webview';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectPairCode} from '@store/tradeview';
import {selectBaseUrl} from '@store/app';

function Chart() {
  const scrollViewRef = useRef<any>(undefined);
  const firstTouchX = useRef<any>(undefined);
  const firstTouchTime = useRef<any>(undefined);
  const firstTouchY = useRef<any>(undefined);
  const inProcess = useRef<boolean>(false);
  const pairCode = useSelector(selectPairCode);
  const baseUrl = useSelector(selectBaseUrl);

  const handleTouchStart = ({nativeEvent}: any) => {
    firstTouchTime.current = nativeEvent.timestamp;

    if (nativeEvent.touches.length > 1) {
      setScrollAccess(false);
    } else {
      firstTouchX.current = nativeEvent.pageX;
      firstTouchY.current = nativeEvent.pageY;
    }

    return true;
  };

  const handleTouchMove = ({nativeEvent}: any) => {
    const diffX = Math.abs(firstTouchX.current - nativeEvent.pageX);
    const diffY = Math.abs(firstTouchY.current - nativeEvent.pageY);

    if (diffX > diffY && !inProcess.current) {
      setScrollAccess(false);
      inProcess.current = true;
    }
  };

  const handleTouchEnd = ({nativeEvent}) => {
    // console.log(nativeEvent.timestamp - firstTouchTime.current);
    setScrollAccess(true);
    inProcess.current = false;
  };

  const setScrollAccess = (bool: boolean) => {
    scrollViewRef?.current.setNativeProps({
      scrollEnabled: bool,
    });
  };

  return (
    <View style={st.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={st.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}>
        <ChartHeader containerStyle={st.ph20} pairCode={pairCode} />
        <View
          style={{height: 400, width: '100%', marginVertical: 10}}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <WebView
            originWhitelist={['*']}
            setBuiltInZoomControls={false}
            source={{
              uri: `https://quan2um.com/ru/mobile/tradeview/${pairCode.toUpperCase()}`,
            }}
          />
        </View>
        <Cup />
      </ScrollView>
    </View>
  );
}

export default Chart;
