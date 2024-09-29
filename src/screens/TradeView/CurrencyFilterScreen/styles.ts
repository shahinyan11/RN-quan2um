import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainer: {
    marginRight: 15,
  },
  containerHeader: {
    paddingVertical: 10,
  },
  titleStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(8),
  },
  inputSearchContainerStyle: {
    marginTop: scaledSize(8),
    flex: 1,
  },
  dividerStyle: {
    marginVertical: scaledSize(8),
  },
});

export default styles;
