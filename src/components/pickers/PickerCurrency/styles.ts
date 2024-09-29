import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
  },

  titleStyle: {
    textTransform: 'uppercase',
    marginHorizontal: 8,
  },
  subtitleStyle: {
    color: '$white50',
  },
});

export default styles;
