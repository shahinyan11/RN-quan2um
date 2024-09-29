import EStyleSheet from 'react-native-extended-stylesheet';

import {t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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

  inputRight: {
    paddingLeft: scaledSize(20),
    borderLeftWidth: 1,
    borderLeftColor: '$white1',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
