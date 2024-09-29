import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '$white1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '$white50',
  },
});

export default styles;
