import {TextStyle, ViewStyle} from 'react-native';
import fonts from '@constants/fonts';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';

interface Button {
  container: ViewStyle;
  text: TextStyle;
}

export const simpleGreen: Button = {
  container: {
    backgroundColor: '#ACE42C',
    paddingHorizontal: scaledSize(20),
    borderRadius: 8,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.UbuntuRegular,
    fontSize: scaledFontSize(16),
    letterSpacing: -0.3,
  },
};

export const simpleTransparent: Button = {
  container: {
    paddingHorizontal: scaledSize(20),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    height: 54,
    borderWidth: 1,
    borderColor: 'rgba(12, 12, 12, 0.4)',
  },

  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.UbuntuRegular,
    fontSize: scaledFontSize(16),
    letterSpacing: -0.3,
  },
};

export const simpleDisabled: Button = {
  container: {
    paddingHorizontal: scaledSize(20),
    backgroundColor: 'rgba(158, 158, 158, 1)',
    borderRadius: 8,
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.UbuntuRegular,
    fontSize: scaledFontSize(16),
    letterSpacing: -0.3,
    color: '$white',
  },
};
