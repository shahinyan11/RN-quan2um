import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {UbReg_14, UbReg_18} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: scaledSize(18),
    paddingBottom: 30,
  },

  image: {
    width: scaledSize(193),
    marginBottom: 70,
  },

  inputContainer: {
    borderColor: '#C1E4FF',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingLeft: 10,
    paddingRight: 0,
    marginVertical: 0,
  },

  input: {
    ...UbReg_18,
    height: 41,
  },

  button: {
    width: '100%',
    marginVertical: 50,
  },

  buttonTitle: {
    textTransform: 'capitalize',
  },

  socials: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 'auto',
  },

  text: {
    ...UbReg_14,
    fontWeight: '400',
    color: '$white',
    marginBottom: 30,
  },
});

export default styles;
