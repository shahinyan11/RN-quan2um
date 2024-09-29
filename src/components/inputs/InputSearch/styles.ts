import EStyleSheet from 'react-native-extended-stylesheet';

import {textMiddle} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(5),
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
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaledSize(16),
    borderRadius: scaledSize(8),
    backgroundColor: '$white5',
  },
  errorTextStyle: {
    marginTop: 4,
  },
  inputStyle: {
    ...textMiddle,
    color: 'white',
    marginHorizontal: scaledSize(12),
    flex: 1,
  },
  inputFocusedStyle: {},
  inputEditableStyle: {
    backgroundColor: '$white10',
  },
});

export default styles;
