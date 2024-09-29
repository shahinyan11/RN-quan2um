import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  phoneNumberStyle: {
    color: '$white75',
    marginVertical: 8,
  },
  infoContainerStyle: {
    alignItems: 'center',
  },
  mainContainerStyle: {
    marginTop: scaledSize(20),
  },
  linkAddPhoneNumberStyle: {
    marginTop: scaledSize(20),
  },
});

export default styles;
