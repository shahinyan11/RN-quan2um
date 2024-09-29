import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '$white1',
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: scaledSize(20),
  },
  tab: {
    flex: 1,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '$gray',
  },
  tabLabel: {
    ...Ub_reg_16,
    fontWeight: '500',
    color: 'white',
  },
});

export default styles;
