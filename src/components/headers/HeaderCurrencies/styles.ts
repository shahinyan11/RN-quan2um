import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  tabContainerStyle: {
    marginRight: scaledSize(8),
    padding: scaledSize(8),

    backgroundColor: '$white5',
    borderRadius: scaledSize(6),
  },
  tabTitleStyle: {
    color: '$white50',
  },
  tabActiveContainerStyle: {
    backgroundColor: '$primaryMain',
  },
  headerContainerStyle: {
    marginVertical: scaledSize(16),
  },
});

export default styles;
