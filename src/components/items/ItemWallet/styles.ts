import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  subtitleStyle: {
    color: '$white75',
    marginTop: scaledSize(8),
  },
  currencyTitleStyle: {
    color: '$white50',
  },
  btnDeleteContainerStyle: {
    flex: 1,
  },
  btnUpdateContainerStyle: {
    flex: 1,
  },
  btnRedContainerStyle: {
    backgroundColor: '$red',
    justifyContent: 'center',
  },
  btnBlueContainerStyle: {
    backgroundColor: '$primaryMain',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  backgroundOptions: {
    flexDirection: 'row',
  },
});

export default styles;
