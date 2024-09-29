import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    paddingHorizontal: scaledSize(10),
  },
  navBar: {
    paddingVertical: scaledSize(10),
  },
  iconBackContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },
  info: {
    color: '$white50',
  },
});

export default styles;
