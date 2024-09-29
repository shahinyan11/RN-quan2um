import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {t3, t4} from '@constants/globalStyles';
import {simpleGreen, simpleTransparent} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '$blackText',
  },

  topContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1,
  },

  close: {
    ...t4,
    letterSpacing: 0.32,
    fontWeight: '400',
    textAlign: 'right',
    color: '$white',
    marginBottom: 38,
  },

  title: {
    ...t3,
    fontWeight: '400',
    lineHeight: 1.4 * scaledFontSize(20),
    color: '$white',
    textAlign: 'center',
    marginBottom: 20,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  image: {
    maxWidth: '100%',
  },

  whiteContainer: {
    paddingHorizontal: scaledSize(20),
    paddingTop: scaledSize(40),
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: '$white',
  },

  text: {
    ...t4,
    fontWeight: '400',
    color: '$blackText',
    lineHeight: 1.4 * scaledFontSize(16),
    marginBottom: 50,
    textAlign: 'center',
  },

  button: {
    bottom: 10,
    ...simpleGreen.container,
  },
  buttonText: simpleGreen.text,

  buttonTransparent: {
    ...simpleTransparent.container,
    marginBottom: scaledSize(15),
  },
});

export default styles;
