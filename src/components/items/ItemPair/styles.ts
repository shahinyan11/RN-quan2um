import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemContainerStyle: {
    paddingVertical: scaledSize(8),
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
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
