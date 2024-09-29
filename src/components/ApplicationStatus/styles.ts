import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {UbReg_14} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    height: 34,
    borderRadius: 34,
    borderWidth: 1,
    paddingHorizontal: scaledSize(22),
    borderColor: 'rgba(127, 101, 255, 1)',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  text: {
    ...UbReg_14,
    color: 'rgba(127, 101, 255, 1)',
    fontWeight: '500',
  },
});

export default styles;
