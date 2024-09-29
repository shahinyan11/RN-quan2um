import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {OS_16, t3, t4, t6} from '@constants/globalStyles';
import {simpleDisabled, simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 34,
    paddingHorizontal: scaledSize(20),
    paddingTop: 20,
  },
  title: {
    ...t3,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(20),
    color: '$black12',
    marginBottom: 20,
    textAlign: 'center',
  },
  desc: {
    ...t4,
    fontWeight: '400',
    marginBottom: 20,
    color: '$blackText',
  },
  label: {
    ...t6,
    marginTop: 8,
    fontWeight: '400',
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledFontSize(12),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '$blackTextLight',
  },
  textareaContainer: {
    borderWidth: 1,
    paddingHorizontal: 0,
    borderColor: '$blackTextLight',
    alignItems: 'flex-start',
  },
  textarea: {
    ...t4,
    fontWeight: '400',
    color: '$blackText',
    letterSpacing: -0.32,
    paddingHorizontal: scaledSize(20),
    paddingTop: 20,
    paddingBottom: 20,
    minHeight: 173,
    maxHeight: 173,
  },
  input: {
    ...t4,
    fontWeight: '400',
    color: '$blackText',
  },
  greenText: {
    ...OS_16,
    fontWeight: '600',
    color: 'rgba(159, 213, 33, 1)',
  },

  uploadsContainer: {
    marginBottom: 100,
  },

  button: {
    position: 'absolute',
    width: scaledSize(335),
    alignSelf: 'center',
    bottom: 24,
    ...simpleGreen.container,
  },

  buttonText: simpleGreen.text,

  buttonDisabled: {
    position: 'absolute',
    width: scaledSize(335),
    alignSelf: 'center',
    bottom: 24,
    ...simpleDisabled.container,
  },

  buttonDisabledText: simpleDisabled.text,
});

export default styles;
