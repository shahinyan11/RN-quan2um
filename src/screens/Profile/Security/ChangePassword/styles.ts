import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12, Ub_reg_14} from '@constants/globalStyles';

const st = EStyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  inputLabel: {
    ...Ub_reg_14,
    fontWeight: '500',
    color: '$white',
  },

  smallText: {
    ...Ub_reg_12,
    fontWeight: '300',
    color: '$white',
    letterSpacing: -0.25,
  },

  textDark: {
    color: '$white50',
    marginBottom: 10,
  },

  dote: {
    marginHorizontal: 5,
  },

  textRow: {
    flexDirection: 'row',
  },

  mb10: {
    marginBottom: 10,
  },
  mb30: {
    marginBottom: 30,
  },
  mb50: {
    marginBottom: 50,
  },
});

export default st;
