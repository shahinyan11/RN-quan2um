import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  ph20: {
    paddingHorizontal: scaledSize(20),
  },
});

export default styles;
