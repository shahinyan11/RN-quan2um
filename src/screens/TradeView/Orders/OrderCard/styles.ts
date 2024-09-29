import {t6, Ub_reg_12} from '@constants/globalStyles';

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
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$white',
    maxWidth: '50%',
  },

  status: {
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$orange',
  },

  cancel: {
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$blueText',
  },
  greenText: {
    color: '$greenText',
  },
  redText: {
    color: '$red',
  },
});

export default styles;
