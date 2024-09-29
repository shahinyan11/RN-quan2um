import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),

    justifyContent: 'center',
  },
  iconStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  titleStyle: {
    textTransform: 'uppercase',
    marginHorizontal: 8,
  },
  subtitleStyle: {
    color: '$white50',
  },
  itemContainerStyle: {
    height: scaledSize(40),
  },
  checkContainerStyle: {
    marginRight: scaledSize(16),
  },
});

export default styles;
