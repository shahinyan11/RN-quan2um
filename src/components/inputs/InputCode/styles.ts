import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  cell: {
    width: scaledSize(48),
    height: scaledSize(50),
    borderWidth: 2,
    borderColor: '$white10',
    borderRadius: 8,
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: '$white75',
  },

  textStyle: {
    textAlign: 'center',
  },
});

export default styles;
