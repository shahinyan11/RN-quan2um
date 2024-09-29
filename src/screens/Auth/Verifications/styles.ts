import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    paddingHorizontal: scaledSize(20),
  },
  centerContainerStyle: {
    marginVertical: scaledSize(10),
    flex: 1,
  },
  btnContainerStyle: {
    alignSelf: 'flex-start',
    marginVertical: scaledSize(20),
  },
  blockContainerStyle: {
    marginVertical: scaledSize(20),
  },
  headerContainerStyle: {
    paddingVertical: 10,
  },
  leftHeaderContainerStyle: {
    width: scaledSize(100),
    alignItems: 'flex-start',
  },
  rightHeaderContainerStyle: {
    width: scaledSize(100),
    alignItems: 'flex-end',
  },
});

export default styles;
