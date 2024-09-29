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
  itemContainerStyle: {
    backgroundColor: '$darkForms',
    //height: scaledSize(64),
    borderRadius: scaledSize(8),
    marginVertical: scaledSize(6),
    padding: scaledSize(20),
  },
  titleStyle: {
    textTransform: 'uppercase',
  },
  ibanStyle: {
    color: '$white50',
    marginRight: scaledSize(6),
  },
  leftContainerStyle: {
    alignSelf: 'flex-start',
    marginVertical: scaledSize(10),
  },
  trashContainerStyle: {
    backgroundColor: '$red',
    marginVertical: scaledSize(6),
    justifyContent: 'center',
    padding: scaledSize(10),
    borderRadius: scaledSize(8),
    marginLeft: scaledSize(6),
  },
  verifiedStyle: {
    color: '$red',
  },
  feeStyle: {
    color: '$white50',
  },
  cancelButtonContainerStyle: {
    marginVertical: 0,
  },
  infoContainerStyle: {
    marginVertical: 5,
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
