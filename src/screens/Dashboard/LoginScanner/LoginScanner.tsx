import React, {useEffect, useRef} from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {stylesGlobal} from '@constants/globalStyles';
import {View} from 'react-native';
import styles from './styles';
import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Scan QR-code from web client to login
 */
const LoginScanner = ({navigation}: any) => {
  const cameraRef = useRef(null);
  const white50 = EStyleSheet.value('$white50');

  const [isCameraActive, setIsCameraActive] = React.useState(false);
  const onBarCodeDetected = async (event: BarCodeReadEvent) => {
    // todo save data from qr-code
    const {data} = event;
    navigation.navigate('VerifyingInfoLogin', {data});
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setIsCameraActive(true);
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      setIsCameraActive(false);
    });
  });

  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <SafeContainer loading={!isCameraActive}>
      <Row containerStyle={styles.navBar}>
        <Icon
          name="arrow-left"
          size={20}
          onPress={handleExit}
          disabled={false}
          color={white50}
          containerStyle={styles.iconBackContainerStyle}
        />
      </Row>
      {isCameraActive && (
        <RNCamera
          ref={cameraRef}
          style={stylesGlobal.fullScale}
          captureAudio={false}
          detectedImageInEvent={true}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={onBarCodeDetected}
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
};

export default LoginScanner;
