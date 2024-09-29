import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '$darkBackground',
  },
  sfContainerStyle: {
    paddingHorizontal: scaledSize(16),
  },
  iconContainerStyle: {
    height: scaledSize(40),
    width: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagStyle: {
    width: scaledSize(24),
    height: scaledSize(16),
  },
  flContainerStyle: {
    flexGrow: 1,
  },
  customDivider: {
    marginVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mainContainerStyle: {
    marginTop: 20,
    flex: 1,
  },
  countryNameStyle: {
    marginHorizontal: scaledSize(12),
    color: '$white75',
    flex: 1,
  },
  phoneCodeStyle: {
    marginHorizontal: scaledSize(12),
    color: '$white75',
  },
  inputContainerStyle: {
    flex: 1,
  },
});

export default styles;
