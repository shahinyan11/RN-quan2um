import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
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

  invalid: {
    borderColor: 'red',
  },

  inputContainer: {
    flex: 1,
    height: '100%',

    marginLeft: scaledSize(20),
    justifyContent: 'center',
  },

  textBox: {
    flexDirection: 'row',
  },

  text: {
    ...t4,
    lineHeight: scaledSize(18),
    color: '$white50',
  },

  input: {
    position: 'absolute',
    opacity: 0,
  },

  focusAnim: {
    height: 20,
    width: 2,
    marginLeft: 2,
    backgroundColor: 'white',
  },
});

export default styles;
