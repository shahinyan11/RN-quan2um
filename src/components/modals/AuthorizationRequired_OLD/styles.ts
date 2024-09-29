import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledFontSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 50,
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: '$white',
  },

  title: {
    ...t3,
    fontWeight: '500',
    marginBottom: 12,
  },

  text: {
    ...t4,
    fontWeight: '400',
    lineHeight: 1.4 * scaledFontSize(16),
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },

  button: {
    height: 54,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACE42C',
  },

  greenText: {
    ...t4,
    fontWeight: '500',
    color: 'rgba(159, 213, 33, 1)',
    textAlign: 'center',
  },
});

export default styles;
