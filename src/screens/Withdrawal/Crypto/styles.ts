import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  btnRightContainer: {
    marginRight: scaledSize(12),
  },
  btnRightTitleStyle: {
    color: '$primaryMain',
  },
  inpContainerStyle: {
    marginVertical: scaledSize(12),
  },
  commentContainerStyle: {
    minHeight: 100,
  },
  hintStyle: {
    marginVertical: 4,
  },
  commissionStyle: {
    color: '$white50',
  },
  infoContainerStyle: {
    marginVertical: scaledSize(10),
  },
  amountDailyMaxStyle: {
    marginVertical: scaledSize(8),
    color: '$white50',
  },
  amountDailyMaxAmountStyle: {
    color: '$white75',
  },
});

export default styles;