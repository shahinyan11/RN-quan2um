import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    justifyContent: 'space-between',
  },
  inpContainerStyle: {
    marginTop: scaledSize(32),
  },
});

export default styles;
