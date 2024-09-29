import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemFilterContainerStyle: {
    width: scaledSize(60),
    minHeight: scaledSize(24),
    backgroundColor: '$white5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledSize(8),
    borderRadius: scaledSize(6),
  },
  itemFilterSelectedContainerStyle: {
    backgroundColor: '$primaryMain',
  },
  filterCurrencyContainerStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(8),
  },
});

export default styles;
