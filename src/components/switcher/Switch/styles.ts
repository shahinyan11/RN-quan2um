import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$white10',
    width: scaledSize(40),
    height: scaledSize(24),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 4,
  },
  activeContainerStyle: {
    backgroundColor: '$primaryMain',
    alignItems: 'flex-end',
  },
  centerViewStyle: {
    backgroundColor: 'white',
    width: scaledSize(16),
    height: scaledSize(16),
    borderRadius: scaledSize(8),
  },
});

export default styles;
