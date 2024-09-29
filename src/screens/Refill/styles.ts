import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  qrCodeStyle: {
    width: scaledSize(200),
    height: scaledSize(200),
  },
  qrCodeContainerStyle: {
    padding: scaledSize(20),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: scaledSize(20),
    marginTop: scaledSize(10),
  },

  btnRightContainer: {
    marginRight: scaledSize(16),
  },
  btnRightTitleStyle: {
    color: '$primaryMain',
  },
  addressContainerStyle: {
    alignItems: 'center',
    marginVertical: 16,
  },
  addressStyle: {
    color: '$white75',
    marginVertical: 8,
  },
  hintStyle: {
    marginVertical: scaledSize(4),
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
