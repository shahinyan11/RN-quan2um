import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {},
  columnStyle: {
    flex: 2,
  },
  columnCenterStyle: {
    flex: 1,
  },
  sCashContainerStyle: {
    zIndex: -1,
    left: scaledSize(8) * -1,
  },
  dividerStyle: {
    marginVertical: scaledSize(16),
  },
  iconLeftContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    zIndex: 10,
  },
  iconRightContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
  },
  rightContainerStyle: {
    zIndex: -10,
    left: scaledSize(8) * -1,
  },
  textStyle: {
    flex: 1,
  },
  leftColumnStyle: {
    flex: 2,
  },
});

export default styles;
