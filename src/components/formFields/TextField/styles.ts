import EStyleSheet from 'react-native-extended-stylesheet';

import {t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '$white1',
    paddingHorizontal: scaledSize(20),
  },

  errorContainer: {
    borderColor: '$red',
  },

  input: {
    ...t4,
    flex: 1,
    color: '$white',
    height: 58, // this value set for KeyboardAvoidingView. It works with input height
  },

  inputBlur: {
    opacity: 0.5,
  },
});

export default styles;
