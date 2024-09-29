import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  inputContainer: {
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '$white1',
    paddingHorizontal: scaledSize(20),
    backgroundColor: '$gray',
  },

  input: {
    ...t4,
    flex: 1,
    color: '$white',
  },
});

export default styles;
