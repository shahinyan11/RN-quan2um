import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: scaledSize(24),
    justifyContent: 'space-between',
  },
  cameraContainerStyle: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  camera: {
    width: '100%',
    height: '100%',
  },

  commentContainerStyle: {
    marginTop: scaledSize(10),
  },

  detectionFrame: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#00ff00',
    zIndex: 9,
  },
  detectionFrameLabel: {
    backgroundColor: 'rgba(0, 255, 0, 0.25)',
  },

  bottom: {
    height: scaledSize(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    width: scaledSize(70),
    height: scaledSize(70),
    borderWidth: 4,
    borderColor: '$white',
    borderRadius: scaledSize(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    width: scaledSize(55),
    height: scaledSize(55),
    borderRadius: scaledSize(55),
    backgroundColor: '$white',
  },
});

export default styles;
