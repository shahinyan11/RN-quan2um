import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    marginBottom: 4,
  },
  hintStyle: {
    marginVertical: scaledSize(4),
    color: '$white75',
  },
  activeDotStyle: {
    color: '$primaryMain',
    marginRight: 4,
  },
  mainContainerStyle: {
    flex: 1,
  },
  inpContainerStyle: {
    marginVertical: scaledSize(12),
  },
  screenContainerStyle: {
    justifyContent: 'center',
  },
  subtitleStyle: {
    marginVertical: scaledSize(20),
  },
});

export default styles;
