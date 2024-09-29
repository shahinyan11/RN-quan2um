import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingHorizontal: scaledSize(16),
  },
  descriptionStyle: {
    color: '$white75',
    marginTop: 4,
  },
  itemContainerStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  statusStyle: {
    color: '$white50',
  },
  iconContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(8),
  },
  google2fContainerStyle: {
    flex: 1,
    marginHorizontal: scaledSize(16),
  },
});

export default styles;
