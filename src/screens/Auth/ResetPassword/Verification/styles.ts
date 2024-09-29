import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  verificationMessageStyle: {
    marginVertical: scaledSize(16),
    lineHeight: 24,
  },
  linkContainerStyle: {
    alignItems: 'flex-start',
  },
  inpContainerStyle: {
    marginTop: scaledSize(32),
  },
  sfContainerStyle: {
    justifyContent: 'space-between',
  },
  valueStyle: {
    color: 'white',
    marginBottom: 15,
  },
});

export default styles;
