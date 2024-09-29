import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),

    justifyContent: 'center',
  },

  titleStyle: {
    textTransform: 'uppercase',
    marginHorizontal: 8,
  },
  subtitleStyle: {
    color: '$white50',
  },
  itemContainerStyle: {
    height: 40,
  },
  inpSearchContainerStyle: {
    flex: 1,
  },
  iconBackContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainerStyle: {
    flex: 1,
    marginVertical: scaledSize(24),
  },
  checkContainerStyle: {
    marginRight: 16,
  },
});

export default styles;
