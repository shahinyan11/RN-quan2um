import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  modalContainer: {
    height: '50%',
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '$darkForms',
    marginBottom: 40,
  },
  button: {
    width: '30%',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonBlock: {
    marginBottom: 40,
  },
  containerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightContainerStyle: {
    marginRight: scaledSize(8),
  },
});

export default styles;
