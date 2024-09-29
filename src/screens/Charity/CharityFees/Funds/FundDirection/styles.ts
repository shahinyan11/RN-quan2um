import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text: {
    ...Ub_reg_16,
    fontWeight: '400',
    color: '#0C0C0C',
    marginBottom: 40,
    letterSpacing: -scaledSize(0.4),
  },
});

export default styles;
