import {useFrameProcessor} from 'react-native-vision-camera';
import {useRef, useState} from 'react';
import {detectObjects} from 'vision-camera-realtime-object-detection';
import {runOnJS} from 'react-native-reanimated';
import checkPositionAccuracy from '@helpers/checkPositionAccuracy';
import {pick} from 'ramda';
import {ValidLabel} from '@store/account/types';

const frameProcessorConfig = {
  modelFile: 'model.tflite',
  scoreThreshold: 0.4,
  maxResults: 1,
  numThreads: 4,
};

type Params = {
  validLabels: ValidLabel[];
};

const useObjectDetection = ({validLabels = []}: Params) => {
  const [objects, setObjects] = useState([]);
  const [isFit, setIsFit] = useState(false);
  const bounds = useRef({
    camera: {width: 0, height: 0, left: 0, top: 0},
    mask: {width: 0, height: 0, left: 0, top: 0},
  }).current;

  const onMaskLayout = e => {
    const {height, width, x, y} = e.nativeEvent.layout;
    bounds.mask = {width, height, left: x, top: y};
  };

  const onContainerLayout = e => {
    const {height, width, x, y} = e.nativeEvent.layout;
    bounds.camera = {width, height, left: x, top: y};
  };

  const onDetect = (data: any) => {
    data?.forEach((obj: any) => {
      obj.top = obj.top * bounds.camera.height;
      obj.left = obj.left * bounds.camera.width;
      obj.width = obj.width * bounds.camera.width;
      obj.height = obj.height * bounds.camera.height;

      const validationResults = validLabels?.map(({label, confidence}) => {
        const found = obj?.labels?.find(
          (objLabel: any) =>
            objLabel.label === label && objLabel.confidence > confidence,
        );

        return Boolean(found);
      });

      if (!validationResults.includes(false)) {
        const objectBounds: any = pick(['top', 'left', 'width', 'height'], obj);

        const _isFit = checkPositionAccuracy({
          maskBounds: bounds.mask,
          objectBounds,
          cameraBounds: bounds.camera,
        });

        setIsFit(_isFit);
        return;
      }

      isFit && setIsFit(false);
    });

    if (!data || !data[0]) {
      isFit && setIsFit(false);
    }

    setObjects(data);
  };

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const detectedObjects = detectObjects(frame, frameProcessorConfig);

      runOnJS(onDetect)(detectedObjects);
    },
    [isFit],
  );

  return {
    isFit,
    objects,
    frameProcessor,
    onMaskLayout,
    onContainerLayout,
  };
};

export default useObjectDetection;
