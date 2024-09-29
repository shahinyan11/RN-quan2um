import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t5} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '$white1',
    borderStyle: 'solid',
    borderRadius: scaledSize(8),
  },
  title: {
    ...t5,
    fontWeight: '500',
    letterSpacing: -0.32,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 0,
  },
  button: {
    backgroundColor: 'transparent',
  },
  buttonGray: {
    backgroundColor: '$gray',
  },
});

export default styles;
