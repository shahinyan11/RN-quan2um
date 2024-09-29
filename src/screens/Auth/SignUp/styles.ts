import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    justifyContent: 'space-between',
  },
  checkBoxContainerStyle: {
    backgroundColor: '$white5',
    borderRadius: 8,
    padding: scaledSize(12),
  },
  termsStyle: {
    flex: 1,
    flexWrap: 'wrap',
  },
  inpContainerStyle: {
    marginBottom: scaledSize(32),
  },
});

export default styles;
