import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  qrCodeStyle: {
    width: scaledSize(200),
    height: scaledSize(200),
  },
  inputContainerStyle: {
    marginVertical: scaledSize(20),
  },

  btnRightContainer: {
    marginRight: scaledSize(16),
  },
  btnRightTitleStyle: {
    color: '$primaryMain',
  },
  cardFieldContainerStyle: {
    height: scaledSize(48),
    width: '100%',
    borderWidth: 1,
    borderColor: '$white10',
    borderRadius: scaledSize(8),
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
  titleStyle: {
    color: '$white75',
    marginTop: scaledSize(24),
    textTransform: 'uppercase',
    fontSize: scaledFontSize(9),
  },
  itemContainerStyle: {
    backgroundColor: '$darkForms',
    //height: scaledSize(64),
    borderRadius: scaledSize(8),
    marginVertical: scaledSize(6),
    padding: scaledSize(20),
  },
  feeStyle: {
    color: '$white50',
  },
  subtitleStyle: {
    color: '$white75',
    marginVertical: scaledSize(16),
  },
  leftContainerStyle: {
    alignSelf: 'flex-start',
    marginVertical: scaledSize(10),
  },
  requisiteContainerStyle: {
    marginVertical: scaledSize(6),
  },
  labelStyle: {
    color: '$white50',
  },
  cardInputLabelStyle: {
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  faqItemContainerStyle: {
    marginVertical: scaledSize(8),
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hintContainerStyle: {
    marginVertical: scaledSize(8),
  },
  btnContainerStyle: {
    marginVertical: 0,
  },
  inpContainerStyle: {
    marginVertical: scaledSize(16),
  },
  leftInpContainerStyle: {
    flex: 1,
    marginRight: scaledSize(5),
  },
  rightInpContainerStyle: {
    flex: 1,
    marginLeft: scaledSize(5),
  },
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
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
