import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {OS_16, t3, t4, t5, t6} from '@constants/globalStyles';
import {
  simpleDisabled,
  simpleGreen,
  simpleTransparent,
} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  safeContainer: {
    backgroundColor: 'white',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: scaledSize(20),
  },

  title: {
    ...t3,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(20),
    marginBottom: 16,
  },

  desc: {
    ...t4,
    fontWeight: '400',
    lineHeight: 1.4 * scaledFontSize(16),
    color: 'rgba(74, 74, 74, 1)',
  },

  infoContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: scaledSize(16),
    borderRadius: 12,
    backgroundColor: '$white',
    marginVertical: 20,

    shadowColor: 'rgba(55, 55, 55)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  textKey: {
    ...t4,
    fontWeight: '400',
    color: 'rgba(12, 12, 12, 0.4)',
  },

  textValue: {
    ...t4,
    fontWeight: '500',
    color: '#373737',
    letterSpacing: -(0.02 * scaledSize(16)),
  },

  label: {
    ...t6,
    fontWeight: '400',
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledFontSize(12),
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '$blackTextLight',
    marginBottom: 20
  },

  inputText: {
    ...t4,
    fontWeight: '400',
    color: '$blackTextLight',
    letterSpacing: -0.32,
  },

  button: {
    marginTop: 'auto',
    alignSelf: 'center',
    ...simpleTransparent.container,
  },

  buttonText: simpleGreen.text,
});

export default styles;
