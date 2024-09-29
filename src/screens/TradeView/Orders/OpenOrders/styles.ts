import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  btnContainerStyle: {
    marginVertical: scaledSize(24),
  },
  btnCancelTitleStyle: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: scaledFontSize(12),
  },
  titleStyle: {
    marginBottom: scaledSize(8),
  },
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(12),
    alignSelf: 'center',
    marginBottom: scaledSize(24),
  },
});

export default styles;
