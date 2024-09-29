import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {t3, t4, t5, UbReg_16} from '@constants/globalStyles';
import {simpleGreen, simpleTransparent} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    borderRadius: 12,
    paddingBottom: 4,
    backgroundColor: '$white',

    shadowColor: 'rgba(55, 55, 55)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  topContainer: {
    paddingTop: 16,
    paddingHorizontal: scaledSize(16),
    marginBottom: 20,
  },

  bottomContainer: {
    paddingHorizontal: scaledSize(16),
    paddingBottom: 20,
  },

  title: {
    ...t3,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(20),
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
    maxWidth: '48%',
    color: 'rgba(12, 12, 12, 0.4)',
  },

  textValue: {
    ...t4,
    fontWeight: '500',
    maxWidth: '48%',
    color: '$blackText',
    letterSpacing: -(0.02 * scaledSize(16)),
  },

  donationContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(12, 12, 12, 0.1)',
    paddingHorizontal: scaledSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  text: {
    ...UbReg_16,
    fontWeight: '400',
    color: '$blackText',
  },

  button: {
    ...simpleGreen.container,
    marginBottom: 12,
  },

  buttonText: simpleGreen.text,

  bottomText: {
    ...t5,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(14),
    color: 'rgba(55, 55, 55, 1)',
  },

  greenText: {
    color: 'rgba(159, 213, 33, 1)',
  },

  buttonTransparent: {
    ...simpleTransparent.container,
    marginBottom: 20,
  },

  editButton: {
    alignItems: 'center',
  },
  editButtonText: {
    ...UbReg_16,
    fontWeight: '500',
    color: 'rgba(126, 196, 71, 1)',
  },
});

export default styles;
