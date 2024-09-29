import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  imageContainerStyle: {
    height: scaledSize(56),
  },
  itemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    textTransform: 'uppercase',
    fontWeight: '500',
    marginVertical: scaledSize(24),
    color: '$white75',
  },
  containerStyle: {
    flex: 1,
    padding: scaledSize(16),
  },

  subtitleStyle: {
    color: '$white50',
    marginTop: scaledSize(10),
    marginBottom: scaledSize(24),
  },
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(8),
    alignSelf: 'center',
    marginVertical: scaledSize(24),
  },
  mainContainerStyle: {
    flex: 1,
    marginTop: scaledSize(50),
  },
  errorMessageStyle: {
    color: '$red',
    marginVertical: scaledSize(20),
  },
});

export default styles;
