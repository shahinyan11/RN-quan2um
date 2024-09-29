import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  subTitleStyle: {
    color: '$white75',
    marginVertical: scaledSize(24),
  },
  mainWindowStyle: {
    minHeight: 300,
  },
  containerStyle: {
    backgroundColor: '$white5',
    borderRadius: scaledSize(6),
    padding: scaledSize(16),
  },
  labelStyle: {
    fontSize: scaledFontSize(12),
    color: '$white50',
  },
});

export default styles;
