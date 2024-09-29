import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  windowContainerStyle: {
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },

  notificationContainerStyle: {
    minHeight: scaledSize(88),
    padding: scaledSize(16),
    backgroundColor: '#37364D',
    borderRadius: scaledSize(12),
  },
  descriptionStyle: {
    marginTop: scaledSize(8),
    color: '$white75',
  },
});

export default styles;
