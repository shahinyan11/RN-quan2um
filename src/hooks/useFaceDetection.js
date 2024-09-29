import {useCallback, useEffect, useRef, useState} from 'react';
import {useFrameProcessor} from 'react-native-vision-camera';
import {scanFaces} from 'vision-camera-face-detector';
import {runOnJS} from 'react-native-reanimated';
import adjustToView from '@helpers/adjustToView';
import checkPositionAccuracy from '@helpers/checkPositionAccuracy';
import {isIos, SCREEN_HEIGHT, SCREEN_WIDTH} from '@constants/deviceInfo';

const useFaceDetection = ({isFront}) => {
  const [faces, setFaces] = useState([]);
  const [frameDimensions, setFrameDimensions] = useState();
  const [isFit, setIsFit] = useState(false);
  const landscapeMode = SCREEN_WIDTH > SCREEN_HEIGHT;
  const mirrored = !isIos && isFront;
  const bounds = useRef({
    camera: {width: 0, height: 0, left: 0, top: 0},
    mask: {width: 0, height: 0, left: 0, top: 0},
  }).current;

  useEffect(() => {
    checkAccuracy();
  }, [faces, bounds.mask]);

  const onMaskLayout = e => {
    const {height, width, x, y} = e.nativeEvent.layout;
    bounds.mask = {width, height, left: x, top: y};
  };

  const onContainerLayout = e => {
    const {height, width, x, y} = e.nativeEvent.layout;
    bounds.camera = {width, height, left: x, top: y};
  };

  const handleScan = useCallback(
    (frame, newFaces) => {
      const isRotated = !landscapeMode;
      setFrameDimensions({
        width: frame?.[isRotated ? 'height' : 'width'],
        height: frame?.[isRotated ? 'width' : 'height'],
      });

      setFaces(newFaces);
    },
    [landscapeMode],
  );

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      runOnJS(handleScan)(frame, scanFaces(frame));
    },
    [handleScan],
  );

  const {adjustRect} = adjustToView(
    frameDimensions,
    {
      width: bounds.camera.width,
      height: bounds.camera.height,
    },
    landscapeMode,
  );

  const checkAccuracy = () => {
    let _isFit = false;

    faces?.map(faceItem => {
      const adjustData = adjustRect(faceItem.bounds);

      _isFit = checkPositionAccuracy({
        maskBounds: bounds.mask,
        objectBounds: adjustData,
        cameraBounds: bounds.camera,
        mirrored,
      });
    });

    setIsFit(_isFit);
  };

  return {
    frameProcessor: isFront ? frameProcessor : null,
    faces: frameDimensions ? faces : [],
    adjustRect,
    isFit,
    onMaskLayout,
    onContainerLayout,
  };
};

export default useFaceDetection;
