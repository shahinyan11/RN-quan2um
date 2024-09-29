import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(12),
  },
  centerContainerStyle: {
    flex: 1,
    marginHorizontal: scaledSize(24),
  },
  titleStyle: {
    marginTop: scaledSize(24),
    marginBottom: scaledSize(32),
    textTransform: 'uppercase',
    color: '$white75',
  },
  subtitleStyle: {
    color: '$white50',
    marginVertical: scaledSize(8),
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  rejectMessageStyle: {
    textTransform: 'uppercase',
  },
});

export default styles;
