import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  linkContainerStyle: {
    alignItems: 'flex-start',
  },

  sfContainerStyle: {
    justifyContent: 'space-between',
  },
  valueStyle: {
    color: 'white',
  },
  titleStyle: {
    marginVertical: scaledSize(16),
  },
  btnContainerStyle: {
    marginVertical: scaledSize(20),
  },
});

export default styles;
