import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(12),
  },
  buttonContainerStyle: {
    height: scaledSize(48),
    padding: scaledSize(12),
    borderRadius: scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    marginRight: scaledSize(18),
  },
  disabledTitleStyle: {
    color: '$white25',
  },
});

export default styles;
