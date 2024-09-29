import {t6} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '$white1',
    borderStyle: 'solid',
    borderRadius: scaledSize(8),
  },
  title: {
    ...t6,
    fontWeight: '500',
    letterSpacing: 0.32,
  },
  buttonContainer: {
    marginVertical: 0,
    flex: 1,
  },
  button: {
    backgroundColor: 'transparent',
  },
  buttonGray: {
    backgroundColor: '$gray',
  },
});

export default styles;
