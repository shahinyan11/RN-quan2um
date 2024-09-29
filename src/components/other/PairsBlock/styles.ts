import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerContainerStyle: {
    paddingHorizontal: scaledSize(8),
    marginBottom: scaledSize(8),
  },
  columnStyle: {
    flex: 2,
  },
  columnCenterStyle: {
    flex: 1,
  },
  headerPairsContainerStyle: {
    marginBottom: scaledSize(16),
  },
  titleStyle: {
    flex: 1,
    color: '$white25',
  },
});

export default styles;
