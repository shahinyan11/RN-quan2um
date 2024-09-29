import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: '$darkBackground'},
  windowStyle: {
    backgroundColor: '$darkBackground',
    padding: scaledSize(12),
    justifyContent: 'center',
    borderRadius: 16,
  },
});

export default styles;
