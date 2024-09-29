import EStyleSheet from 'react-native-extended-stylesheet';

import {textMiddle} from '@constants/globalStyles';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(6),
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
    alignItems: 'center',
    paddingHorizontal: scaledSize(16),
    borderRadius: scaledSize(8),
  },
  errorTextStyle: {
    marginTop: 4,
  },
  inputStyle: {
    ...textMiddle,
    color: 'white',
    marginLeft: 8,
    flex: 1,
  },
  inputFocusedStyle: {
    backgroundColor: '$white5',
  },
  inputEditableStyle: {
    backgroundColor: '$white10',
  },
});

export default styles;
