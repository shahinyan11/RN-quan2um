import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingTop: scaledSize(40),
    borderRadius: scaledSize(8),
    marginHorizontal: scaledSize(20),
    paddingBottom: scaledSize(20),
  },

  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },

  image: {
    width: '100%',
    marginBottom: scaledSize(30),
  },

  content: {
    paddingHorizontal: scaledSize(20),
  },

  title: {
    ...t3,
    fontWeight: '500',
    color: '$blackText',
    letterSpacing: -0.32,
    marginBottom: scaledSize(20),
    lineHeight: 1.4 * scaledSize(20),
  },

  description: {
    ...t4,
    fontWeight: '400',
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledSize(16),
    marginBottom: scaledSize(20),
  },

  firstBtn: {
    ...simpleGreen.container,
  },

  firstBtnText: simpleGreen.text,

  secondBtn: {
    marginTop: scaledSize(20),
  },
  secondBtnText: {
    ...t4,
    fontWeight: '500',
    color: 'rgba(159, 213, 33, 1)',
    textAlign: 'center',
  },
});

export default styles;
