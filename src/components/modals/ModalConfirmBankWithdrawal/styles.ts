import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  subtitleStyle: {
    marginTop: scaledSize(24),
    color: '$white75',
  },
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    marginRight: scaledSize(10),
  },
  currencyAmountStyle: {
    marginTop: scaledSize(8),
    marginBottom: scaledSize(20),
  },
  valueStyle: {
    color: '$white50',
  },
  btnContainerStyle: {
    marginVertical: 0,
  },
  rowWrap: {
    flexWrap: 'wrap',
  },
});

export default styles;
