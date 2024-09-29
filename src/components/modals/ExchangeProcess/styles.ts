import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {OS_10, OS_14, OS_16} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  content: {
    paddingHorizontal: scaledSize(20),
  },
  title: {
    ...OS_16,
    color: '$white',
    fontWeight: '500',
    letterSpacing: -scaledSize(0.32),
    marginBottom: scaledSize(30),
  },

  row: {
    flexDirection: 'row',
    marginBottom: scaledSize(20),
  },

  m_r_50: {
    marginRight: scaledSize(50),
  },

  label: {
    ...OS_10,
    color: '$white',
    fontWeight: '400',
    letterSpacing: -scaledSize(0.2),
    marginBottom: 5,
  },

  value: {
    ...OS_14,
    color: '$white',
    fontWeight: '600',
    letterSpacing: -scaledSize(0.2),
    marginBottom: scaledSize(30),
  },

  greenText: {
    color: '#66FFAC',
  },

  blueText: {
    color: '#66D6FF',
  },

  buttonContainer: {
    marginVertical: 0,
    height: scaledSize(50),
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelText: {
    marginVertical: 20,
    color: '$white25',
    textAlign: 'center',
  },
});

export default styles;
