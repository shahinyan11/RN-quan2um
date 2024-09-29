import {TextStyle} from 'react-native';

import {scaledFontSize, scaledSize} from '@utils/scaledSize';

import fonts from './fonts';
import EStyleSheet from 'react-native-extended-stylesheet';

export const t1: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(32),
};

export const t2: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(24),
};

export const t3: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(20),
};

export const t4: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(16),
};

export const t5: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(14),
};

export const t6: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(12),
};

export const tTiny: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(9),
};

export const textRegular: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(16),
};

export const textMiddle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(14),
};

export const textSmall: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(12),
};

export const textMini: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(10),
};

export const btnRegular: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(14),
  letterSpacing: 0.4,
};

export const btnSmall: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(12),
};

export const btnMini: TextStyle = {
  fontFamily: fonts.UbuntuMedium,
  fontSize: scaledFontSize(10),
};

export const OS_20: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(20),
};

export const OS_18: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(18),
};

export const OS_16: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(16),
};

export const OS_14: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(14),
};

export const OS_12: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(12),
};
export const OS_10: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(10),
};

export const OS_8: TextStyle = {
  fontFamily: fonts.OSRegular,
  fontSize: scaledFontSize(8),
};

export const UbReg_22: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(22),
};

export const UbReg_20: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(20),
};

export const UbReg_18: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(18),
};

export const UbReg_16: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(16),
};

export const UbReg_14: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(14),
};

export const UbReg_12: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(12),
};

export const Ub_reg_30: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(30),
};

export const Ub_reg_26: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(26),
};

export const Ub_reg_24: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(24),
};

export const Ub_reg_22: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(22),
};

export const Ub_reg_20: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(20),
};

export const Ub_reg_18: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(18),
};

export const Ub_reg_16: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(16),
};

export const Ub_reg_14: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(16),
};
export const Ub_reg_12: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(12),
};
export const Ub_reg_10: TextStyle = {
  fontFamily: fonts.UbuntuRegular,
  fontSize: scaledFontSize(10),
};

export const stylesGlobal = EStyleSheet.create({
  screenContainerStyle: {
    flex: 1,
    paddingHorizontal: scaledSize(16),
  },
  mainContainerStyle: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextStyle: {
    color: '$white50',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  fullScale: {
    flex: 1,
  },
});
