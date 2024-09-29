import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_16, Ub_reg_18, Ub_reg_30} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  content: {
    paddingVertical: 28,
    paddingHorizontal: scaledSize(35),
    backgroundColor: '$blackBackground',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    width: scaledSize(335),
  },

  image: {
    width: scaledSize(189),
    height: scaledSize(189),
    marginVertical: 20,
  },

  title: {
    ...Ub_reg_18,
    fontWeight: '500',
    color: '$white',
    textAlign: 'center',
    letterSpacing: -0.3,
  },

  text: {
    ...Ub_reg_16,
    fontWeight: '400',
    color: '$white',
    textAlign: 'center',
    letterSpacing: -0.3,
  },

  amount: {
    ...Ub_reg_30,
    fontWeight: '500',
    color: '#66FFAC',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginTop: 10,
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
