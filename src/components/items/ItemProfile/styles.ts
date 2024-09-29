import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  crownContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    marginRight: scaledSize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: '$white50',
    marginRight: 8,
  },
  counterStyle: {
    color: '$primaryMain',
  },
  bottomContainerStyle: {
    marginTop: scaledSize(10),
  },
  containerStyle: {
    marginVertical: scaledSize(16),
  },
});

export default styles;
