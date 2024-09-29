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
    marginBottom: 60,
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
    marginTop: 42,
  },

  buttonTitle: {
    textTransform: 'capitalize',
  },

  text: {
    ...UbReg_14,
    fontWeight: '400',
    color: '$white',
  },

  textCreate: {
    ...UbReg_14,
    fontWeight: '400',
    color: '#01B2C3',
    marginLeft: scaledSize(10),
  },
});

export default styles;
