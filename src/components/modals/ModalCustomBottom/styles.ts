import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: '$darkBackground'},
  windowStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalWindowStyle: {
    backgroundColor: '$darkForms',
    borderRadius: 16,
    padding: scaledSize(24),
  },
});

export default styles;
