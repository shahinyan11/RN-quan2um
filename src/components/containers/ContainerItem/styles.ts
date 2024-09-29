import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkForms',
    borderRadius: 12,
    marginVertical: scaledSize(8),
    padding: scaledSize(16),
  },
});

export default styles;
