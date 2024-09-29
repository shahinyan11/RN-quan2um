import EStyleSheet from 'react-native-extended-stylesheet';

import {Ub_reg_10, Ub_reg_12, Ub_reg_14} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'rgba(43, 42, 65, 1)',
    marginBottom: scaledSize(20),
    padding: scaledSize(10),
    borderRadius: scaledSize(7),
    alignSelf: 'flex-start',
    minWidth: scaledSize(75),
    maxWidth: '75%',
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(45, 43, 78, 1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  author: {
    ...Ub_reg_12,
    color: '$white50',
    letterSpacing: -0.25,
  },
  icon: {
    marginHorizontal: 3,
    transform: [{rotate: '180deg'}],
  },
  green: {
    color: 'rgba(1, 232, 142, 1)',
  },
  red: {
    color: 'rgba(239, 68, 74, 1)',
  },
  text: {
    ...Ub_reg_14,
    color: '$white',
    marginBottom: 5,
    letterSpacing: -0.25,
  },
  time: {
    ...Ub_reg_10,
    color: '$white',
    fontWeight: '300',
    letterSpacing: -0.25,
    alignSelf: 'flex-end',
  },
});

export default styles;
