import {
  btnMini,
  btnRegular,
  btnSmall,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  textMiddle,
  textMini,
  textRegular,
  textSmall,
  tTiny,
} from '@constants/globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  t1: {
    ...t1,
    color: 'white',
  },
  t2: {
    ...t2,
    color: 'white',
  },
  t3: {
    ...t3,
    color: 'white',
  },
  t4: {
    ...t4,
    color: 'white',
  },
  t5: {
    ...t5,
    color: 'white',
  },
  t6: {
    ...t6,
    color: 'white',
  },
  tTiny: {
    ...tTiny,
    color: 'white',
  },
  btnMini: {
    ...btnMini,
    color: 'white',
  },
  btnRegular: {
    ...btnRegular,
    color: 'white',
  },
  btnSmall: {
    ...btnSmall,
    color: 'white',
  },
  textMiddle: {
    ...textMiddle,
    color: 'white',
  },
  textMini: {
    ...textMini,
    color: 'white',
  },
  textSmall: {
    ...textSmall,
    color: 'white',
  },
  textRegular: {
    ...textRegular,
    color: 'white',
  },
  errorText: {
    ...btnMini,
    color: '#F84651',
  },
  description: {
    ...textMiddle,
    color: '$white50',
  },
  hint: {
    ...textMini,
    color: '$white50',
  },
  label: {
    ...textMini,
    color: '$white50',
  },
});

export default styles;
