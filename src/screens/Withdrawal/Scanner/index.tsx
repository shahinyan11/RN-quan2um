import 'react-native-reanimated';
import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import {stylesGlobal} from '@constants/globalStyles';
import styles from './styles';
import {runOnJS} from 'react-native-reanimated';

/**
 * Screen Scanner
 * @param route
 */
function Scanner({route}: any) {
  const navigation = useNavigation();
  const {callbackSetData} = route.params;

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
    })();
  });

  const onBarCodeDetected = useCallback((event: any) => {
    callbackSetData(event[0]);
    navigation.goBack();
  }, []);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
        checkInverted: true,
      });

      if (detectedBarcodes.length > 0) {
        runOnJS(onBarCodeDetected)(detectedBarcodes);
      }
    },
    [onBarCodeDetected],
  );

  return (
    <SafeContainer loading={!device}>
      {device && (
        <Camera
          style={stylesGlobal.fullScale}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      )}
      <View style={styles.maskContainerStyle}>
        <View style={styles.scannerContainerStyle}>
          <Row
            justifyContent="space-between"
            alignItems="flex-start"
            containerStyle={stylesGlobal.mainContainerStyle}>
            <View style={styles.leftTopContainerStyle} />
            <View style={styles.rightTopContainerStyle} />
          </Row>
          <Row
            justifyContent="space-between"
            alignItems="flex-end"
            containerStyle={stylesGlobal.mainContainerStyle}>
            <View style={styles.leftBottomContainerStyle} />
            <View style={styles.rightBottomContainerStyle} />
          </Row>
        </View>
      </View>
    </SafeContainer>
  );
}

export default Scanner;
