import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  mainContainerStyle: {
    zIndex: 9999999,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  alertContainerStyle: {
    zIndex: 9999999,
    minHeight: scaledSize(50),
    paddingHorizontal: scaledSize(16),
  },
  iconContainerStyle: {
    marginRight: scaledSize(16),
  },
  messageContainerStyle: {
    flex: 1,
    marginVertical: 10,
  },

  successStyle: {
    backgroundColor: '$green',
  },
  errorStyle: {
    backgroundColor: '$red',
  },
  alertStyle: {
    backgroundColor: '$yellow',
  },
});

export default styles;
