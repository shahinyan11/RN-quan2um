import {t6, Ub_reg_10} from '@constants/globalStyles';

import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#292839',
    paddingHorizontal: scaledSize(10),
    borderRadius: 5,
    marginBottom: 10,
  },
  closeIcon: {
    backgroundColor: '#2E3548',
    borderRadius: 5,
    overflow: 'hidden',
    transform: [{rotate: '180deg'}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  key: {
    ...t6,
    fontWeight: '400',
    color: '$white50',
  },

  value: {
    ...t6,
    fontWeight: '500',
    color: '$white',
    maxWidth: '50%',
  },

  smallValue: {
    ...Ub_reg_10,
    fontWeight: '500',
    color: '$white',
    alignItems: 'flex-end',
    maxWidth: '50%',
  },

  redValue: {
    ...t6,
    fontWeight: '500',
    color: 'rgba(239, 68, 74, 1)',
  },
  greenValue: {
    ...t6,
    fontWeight: '500',
    color: '#95E7B6',
  },

  countDownText: {
    ...t6,
    fontWeight: '500',
    color: '#BABABA',
    margin: 0,
    padding: 0,
  },

  withdraw: {
    ...t6,
    fontWeight: '700',
    color: '$white50',
  },
});

export default styles;
