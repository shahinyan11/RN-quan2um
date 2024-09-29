import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    padding: scaledSize(16),
  },
  btnContainerStyle: {
    borderWidth: 2,
    borderColor: '$primaryMain',
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaledSize(20),
  },
  btnContainerEmptyStyle: {
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaledSize(20),
  },
  btnCancelContainerStyle: {
    backgroundColor: '$red',
  },
  rowContainerStyle: {
    marginVertical: scaledSize(10),
  },
  passwordContainerStyle: {
    justifyContent: 'center',
    marginVertical: scaledSize(20),
    flex: 1,
  },
  controlContainerStyle: {
    flex: 3,
    justifyContent: 'space-between',
  },
  inputStyle: {
    color: '$primaryMain',
    letterSpacing: 2,
    fontSize: scaledFontSize(20),
    textAlign: 'center',
    marginVertical: scaledSize(10),
  },
  btnNextContainerStyle: {
    marginTop: scaledSize(30),
  },
  btnSubmitContainerStyle: {
    marginVertical: 0,
  },
  errorTitleStyle: {
    color: '$red',
  },
});

export default styles;