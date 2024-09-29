import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12, Ub_reg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '$white50',
    paddingHorizontal: scaledSize(20),
  },
  greenCircle: {
    height: 6,
    width: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(25, 183, 108, 1)',
    marginRight: scaledSize(2),
    marginLeft: scaledSize(10),
  },
  onlineText: {
    ...Ub_reg_12,
    fontWeight: '400',
    letterSpacing: -0.25,
    color: '$white50',
    marginRight: scaledSize(10),
  },
  onlineCount: {
    ...Ub_reg_16,
    fontWeight: '500',
    letterSpacing: -0.32,
    color: '$white',
  },
  contentContainer: {
    flex: 1,
    padding: scaledSize(20),
  },
});

export default styles;
