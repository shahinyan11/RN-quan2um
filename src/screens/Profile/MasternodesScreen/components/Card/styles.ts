import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {t4, t5} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    height: scaledSize(102),
    borderWidth: 1,
    marginBottom: 4,
    paddingVertical: scaledSize(16),
    paddingLeft: scaledSize(20),
    paddingRight: scaledSize(15),
    borderStyle: 'solid',
    borderColor: '$white1',
    borderRadius: 4,
    width: scaledSize(165),
    justifyContent: 'space-between',
  },
  text: {
    ...t4,
    color: '$white75',
  },
  textSmall: {
    ...t5,
    color: '$white35',
  },
});

export default styles;
