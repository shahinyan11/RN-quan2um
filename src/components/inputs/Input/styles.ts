import EStyleSheet from 'react-native-extended-stylesheet';

import {textMiddle} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {},
  topContainerStyle: {
    marginBottom: 4,
  },
  labelStyle: {
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '$white10',
    minHeight: scaledSize(50),
    justifyContent: 'center',
    paddingHorizontal: scaledSize(16),
    borderRadius: scaledSize(8),
  },
  errorTextStyle: {
    marginTop: 4,
  },
  inputStyle: {
    ...textMiddle,
    color: 'white',
    flex: 1,
  },
  inputFocusedStyle: {
    backgroundColor: '$white5',
  },
  inputEditableStyle: {
    backgroundColor: '$white10',
  },
  subHintStyle: {
    color: '$white75',
  },
});

export default styles;
