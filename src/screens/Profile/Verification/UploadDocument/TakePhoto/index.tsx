import React, {useEffect, useMemo, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import SafeContainer from '@components/containers/SafeContainer';
import Loader from '@components/other/Loader';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import {isIos} from '@constants/deviceInfo';
import useFaceDetection from '@hooks/useFaceDetection';
import useObjectDetection from '@hooks/useObjectDetection';

import st from './styles';
import TestObjBounds from './TestObjBounds';
import TestFaceBounds from './TestFaceBounds';
import Mask from '@screens/Profile/Verification/UploadDocument/TakePhoto/Mask';
import {useSelector} from 'react-redux';
import {selectVerification} from '@store/account/selectors';

export default function TakePhoto({onTakePhoto, selfie}: any) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const {is_dev_mode, recognition_enabled, valid_labels} =
    useSelector(selectVerification);
  const device = selfie ? devices.front : devices.back;
  const format = useCameraFormat(device);
  const useDetection = selfie ? useFaceDetection : useObjectDetection;

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const takePhoto = async () => {
    const photo = await camera?.current?.takePhoto();
    const path = isIos ? photo.path : `file://${photo.path}`;

    onTakePhoto(path);
  };

  const {
    frameProcessor,
    isFit,
    onMaskLayout,
    onContainerLayout,
    objects,
    faces,
    adjustRect,
  } = useDetection({
    isFront: selfie,
    validLabels: valid_labels,
  }) as any;

  const disabled = useMemo(() => {
    return recognition_enabled && !isFit;
  }, [recognition_enabled, isFit]);

  return (
    <SafeContainer>
      <View style={st.container}>
        {!device && <Loader />}
        <View style={st.cameraContainerStyle} onLayout={onContainerLayout}>
          {device && (
            <>
              <Camera
                ref={camera}
                format={format}
                device={device}
                photo={true}
                audio={false}
                isActive={true}
                frameProcessorFps={10}
                style={st.camera}
                frameProcessor={frameProcessor}
              />
              <Mask isFit={isFit} isSelfie={selfie} onLayout={onMaskLayout} />
            </>
          )}
          {is_dev_mode && (
            <>
              <TestObjBounds data={objects} />
              <TestFaceBounds
                data={faces}
                adjustRect={adjustRect}
                isFront={selfie}
              />
            </>
          )}
        </View>
        <View style={st.bottom}>
          <TouchableOpacity
            onPress={takePhoto}
            disabled={disabled}
            style={[st.capture, {opacity: disabled ? 0.3 : 1}]}>
            <View style={st.round} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeContainer>
  );
}
