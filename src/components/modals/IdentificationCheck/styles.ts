import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_14, Ub_reg_18, Ub_reg_24} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '$blackBackground',
  },

  sheet: {
    borderTopEndRadius: scaledSize(8),
    borderTopStartRadius: scaledSize(8),
    paddingBottom: 48,
    paddingTop: 20,
    flex: 1,
  },

  close: {
    marginLeft: 'auto',
    marginRight: scaledSize(20),
    marginBottom: 25,
  },

  title: {
    ...Ub_reg_24,
    fontWeight: '500',
    color: '$white',
    marginBottom: 20,
    marginLeft: scaledSize(20),
  },

  content: {
    flex: 1,
    paddingTop: 40,
    borderTopWidth: 1,
    paddingBottom: 10,
    borderTopColor: '$white10',
    paddingHorizontal: scaledSize(20),
  },

  labelStyle: {
    ...Ub_reg_14,
    fontWeight: '300',
    letterSpacing: -scaledSize(0.3),
    color: '$white',
    maxWidth: scaledSize(230),
  },

  whiteText: {
    ...Ub_reg_18,
    fontWeight: '400',
    letterSpacing: -scaledSize(0.3),
    color: '$white',
  },

  greenText: {
    ...Ub_reg_18,
    fontWeight: '400',
    letterSpacing: -scaledSize(0.3),
    color: '#00D89D',
  },

  inputContainer: {
    height: 58,
    marginBottom: 20,
  },

  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  button: {
    height: 58,
  },
  underlineText: {
    ...Ub_reg_14,
    fontWeight: '300',
    color: '$white50',
    textDecorationLine: 'underline',
  },
});

export default styles;
