import {StyleSheet} from 'react-native';
import {Ub_reg_20} from '@constants/globalStyles';

const st = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },

  title: {
    ...Ub_reg_20,
    fontWeight: '500',
    letterSpacing: -0.4,
    flex: 1,
    marginHorizontal: 15,
  },
});

export default st;
