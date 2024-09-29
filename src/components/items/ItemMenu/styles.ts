import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    padding: scaledSize(8),
    borderRadius: scaledSize(8),
    backgroundColor: '$white5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaledSize(16),
  },
  titleContainerStyle: {
    flex: 1,
  },
});

export default styles;
