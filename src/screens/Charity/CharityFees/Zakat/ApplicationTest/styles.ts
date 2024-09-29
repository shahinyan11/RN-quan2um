import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {UbReg_16, UbReg_20} from '@constants/globalStyles';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$blackText',
    paddingHorizontal: scaledSize(20),
    paddingBottom: 20,
  },

  title: {
    ...UbReg_20,
    letterSpacing: 0.32,
    fontWeight: '400',
    color: '$white',
    marginTop: 18,
    marginBottom: 40,
  },

  whiteContainer: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '$white',
    padding: scaledSize(16),
    marginBottom: scaledSize(24),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  lightText: {
    ...UbReg_16,
    lineHeight: scaledSize(16) * 1.4,
    color: '$blackTextLight',
  },

  countDown: {
    ...UbReg_16,
    fontWeight: '500',
    lineHeight: scaledSize(16) * 1.4,
    color: '#7F6CFF',
  },

  question: {
    ...UbReg_20,
    fontWeight: '500',
    lineHeight: scaledSize(20) * 1.4,
    color: '$blackText',
    marginTop: scaledSize(32),
    marginBottom: scaledSize(24),
  },

  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  button: {
    ...simpleGreen.container,
    // ...simpleDisabled.container,
    marginBottom: scaledSize(20),
  },
  buttonText: simpleGreen.text,
});

export default styles;
