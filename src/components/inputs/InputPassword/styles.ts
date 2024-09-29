import EStyleSheet from 'react-native-extended-stylesheet';

import {textMiddle} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(6),
  },
  bottomContainerStyle: {
    marginTop: 4,
  },
  topContainerStyle: {
    marginBottom: 4,
  },
  labelStyle: {
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '$white10',
    height: scaledSize(50),
    justifyContent: 'center',
    paddingHorizontal: scaledSize(16),
    borderRadius: scaledSize(8),
  },
  errorTextStyle: {},
  inputStyle: {
    ...textMiddle,
    color: 'white',
  },
  inputFocusedStyle: {
    backgroundColor: '$white5',
  },
  inputEditableStyle: {
    backgroundColor: '$white10',
  },
});

export default styles;
