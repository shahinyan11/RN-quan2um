import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {textMiddle} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
  flagStyle: {
    width: scaledSize(24),
    height: scaledSize(16),
  },
  phoneCodeStyle: {
    marginHorizontal: scaledSize(8),
    color: '$white75',
  },

  nameStyle: {
    ...textMiddle,
    color: 'white',
    flex: 1,
  },
});

export default styles;
