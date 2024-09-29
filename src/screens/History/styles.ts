import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerContainerStyle: {
    marginVertical: scaledSize(16),
  },
  columnContainerStyle: {
    flex: 1,
  },
  labelStyle: {
    color: '$white50',
  },
  centerLabelStyle: {
    color: '$white50',
    textAlign: 'center',
  },
  rightLabelStyle: {
    color: '$white50',
    textAlign: 'right',
  },
});

export default styles;
