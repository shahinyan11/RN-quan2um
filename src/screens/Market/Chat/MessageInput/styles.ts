import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';
import {UbReg_14} from '@constants/globalStyles';

const st = EStyleSheet.create({
  container: {
    minHeight: 40,
    maxHeight: 120,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(2, 175, 251, 1)',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaledSize(10),
  },
  containerBlur: {
    borderColor: '$white35',
  },

  input: {
    flex: 1,
    ...UbReg_14,
    color: '$white',
    letterSpacing: -0.3,
  },

  rightBox: {
    flexDirection: 'row',
  },
});

export default st;
