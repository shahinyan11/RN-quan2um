import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scaledSize(16),
  },
  containerStyle: {
    paddingBottom: scaledSize(20),
  },
});

export default styles;
