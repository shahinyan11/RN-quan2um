import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  subtitleStyle: {
    color: '$white50',
  },
  arrowContainerStyle: {
    marginLeft: 10,
  },
  coinContainerStyle: {
    width: 44,
    height: 44,
    marginHorizontal: 0,
    marginRight: 8,
  },
  titleStyle: {
    textTransform: 'uppercase',
  },
  iconStyle: {
    flex: 1,
    height: null,
    width: null,
  },
  iconContainerStyle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: scaledSize(16),
  },
});

export default styles;
