import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  tab: {
    borderWidth: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '$white1',
    borderRadius: scaledSize(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaledSize(30),
    justifyContent: 'space-between',
    marginBottom: scaledSize(20),
  },
  text: {
    ...t4,
    color: '$white',
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
