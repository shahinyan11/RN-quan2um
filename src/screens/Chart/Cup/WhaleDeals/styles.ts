import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12, Ub_reg_14, Ub_reg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const st = EStyleSheet.create({
  container: {
    padding: scaledSize(20),
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    height: 40,
    borderWidth: 0.6,
    borderColor: '#02AFFB',
    borderRadius: 6,
    paddingLeft: scaledSize(12),
    paddingRight: scaledSize(8),
  },
  selectText: {
    ...Ub_reg_14,
    color: '#02AFFB',
    letterSpacing: -0.3,
  },
  deal: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    ...Ub_reg_16,
    color: '$white',
    letterSpacing: -0.3,
  },

  textDark: {
    color: '$white50',
  },

  textSmall: {
    ...Ub_reg_12,
    color: '$white',
    letterSpacing: -0.25,
  },

  icon: {
    width: scaledSize(34),
    height: scaledSize(34),
    borderRadius: scaledSize(4),
    marginLeft: scaledSize(10),
  },
});

export default st;
