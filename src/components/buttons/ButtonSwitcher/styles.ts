import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  activeButtonContainerStyle: {
    backgroundColor: '$primaryMain',
    height: scaledSize(32),
    flex: 1,
    justifyContent: 'center',
    borderRadius: scaledSize(8),
  },

  disabledButtonContainerStyle: {
    backgroundColor: '$white5',
  },
  titleStyle: {textTransform: 'uppercase'},
});

export default styles;
