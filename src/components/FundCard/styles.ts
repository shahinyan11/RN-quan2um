import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {t4, UbReg_16} from '@constants/globalStyles';
import {simpleGreen, simpleTransparent} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    borderRadius: scaledSize(8),
    position: 'relative',
    shadowColor: 'rgba(55, 55, 55)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  image: {
    width: '100%',
    height: scaledSize(222),
    borderRadius: 8,
  },

  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    maxWidth: '100%',
    top: scaledSize(12),
    left: scaledSize(12),
  },

  icon: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 32,
    marginRight: scaledSize(8),
  },

  name: {
    color: '$white',
    marginLeft: 8,
    marginRight: 10,
    maxWidth: '75%',
  },

  whiteContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 4,
    borderRadius: 12,
    backgroundColor: '$white',
    marginTop: -scaledSize(66),

    shadowColor: 'rgba(55, 55, 55)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  pHorizontal: {
    paddingHorizontal: scaledSize(16),
  },

  title: {
    ...t4,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(16),
  },

  lightText: {
    ...t4,
    fontWeight: '400',
    color: 'rgba(12, 12, 12, 0.4)',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 1.4 * scaledFontSize(16),
  },

  greenText: {
    ...UbReg_16,
    color: '$greenText',
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  divider: {
    height: 12,
  },

  textKey: {
    ...t4,
    fontWeight: '400',
    color: '$blackTextLight',
  },

  textValue: {
    ...t4,
    fontWeight: '500',
    color: '$blackTextLight',
    letterSpacing: -(0.02 * scaledSize(16)),
  },

  donationContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(12, 12, 12, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  text: {
    ...UbReg_16,
    fontWeight: '400',
    color: '$blackText',
  },

  textBold: {
    ...UbReg_16,
    fontWeight: '500',
    color: '$blackText',
  },

  button: {
    ...simpleGreen.container,
    marginBottom: 20,
  },

  buttonText: {
    ...simpleGreen.text,
  },

  buttonTransparent: {
    ...simpleTransparent.container,
    marginBottom: 20,
  },

  editButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default styles;
