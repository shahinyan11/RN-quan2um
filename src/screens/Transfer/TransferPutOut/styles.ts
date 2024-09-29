import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  mainContainerStyle: {
    marginTop: scaledSize(20),
  },
  inpContainerStyle: {
    marginVertical: scaledSize(12),
  },

  inputContainerStyle: {
    minHeight: scaledSize(100),
  },
  inputMessageStyle: {
    textAlignVertical: 'top',
    height: '100%',
  },
  containerStyle: {
    marginTop: scaledSize(12),
  },
  transferContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainerStyle: {
    marginVertical: scaledSize(8),
  },
  labelStyle: {
    color: '$white50',
  },
});

export default styles;
