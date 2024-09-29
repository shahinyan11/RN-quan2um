import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  bodyHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  ph20: {
    paddingHorizontal: scaledSize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  greenBackground: {
    top: 0,
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(25, 183, 108, 0.1)',
  },
  redBackground: {
    top: 0,
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(239, 68, 74, 0.5)',
  },
  textWhite: {
    ...Ub_reg_12,
    color: '$white',
    fontWeight: '500',
    flex: 1,
  },
  textGreen: {
    ...Ub_reg_12,
    color: 'rgba(25, 183, 108, 1)',
    fontWeight: '500',
    marginHorizontal: 5,
  },
  textRed: {
    ...Ub_reg_12,
    color: 'rgba(239, 68, 74, 1)',
    fontWeight: '500',
    marginHorizontal: 5,
  },
  textRight: {
    textAlign: 'right',
  },
  hidden: {
    flex: 1,
  },
  bottomContainer: {},
});

export default styles;
