import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {t3, t4, t5, t6} from '@constants/globalStyles';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  whiteContainer: {
    padding: 20,
    marginTop: -34,

    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: '$white',
    position: 'relative',
  },

  sign: {
    height: 8,
    width: 28,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#EFEFEF',
  },

  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  icon: {
    backgroundColor: 'grey',
    height: 32,
    width: 32,
    borderRadius: 32,
    marginRight: scaledSize(8),
  },

  name: {
    ...t4,
    fontWeight: '500',
    color: '$blackText',
    marginLeft: 8,
    marginRight: 4,
  },
  title: {
    ...t3,
    fontWeight: '500',
    color: '$blackText',
    lineHeight: 1.4 * scaledFontSize(16),
    marginBottom: 12,
  },
  text: {
    ...t4,
    fontWeight: '400',
    color: '$blackText',
    lineHeight: 1.4 * scaledFontSize(16),
    marginTop: 4,
    marginBottom: 40,
  },
  infoLabel: {
    ...t6,
    color: 'rgba(12, 12, 12, 0.4)',
    marginBottom: 8,
    letterSpacing: -0.32,
  },

  infoBox: {
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaledSize(20),
    borderColor: 'rgba(12, 12, 12, 0.4)',
    marginBottom: 16,
  },
  infoText: {
    ...t5,
    color: 'rgba(12, 12, 12, 0.4)',
  },

  socialBackground: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$blackText',
    marginRight: 16,
  },

  button: {
    position: 'absolute',
    width: scaledSize(335),
    alignSelf: 'center',
    bottom: 54,
    ...simpleGreen.container,
  },

  buttonText: simpleGreen.text,
});

export default styles;
