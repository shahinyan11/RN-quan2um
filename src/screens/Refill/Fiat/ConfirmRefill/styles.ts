import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  qrCodeStyle: {
    width: scaledSize(200),
    height: scaledSize(200),
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
  faqItemContainerStyle: {
    marginVertical: scaledSize(8),
  },
  containerStyle: {
    marginTop: scaledSize(12),
  },
  submitBtnContainerStyle: {
    marginVertical: 0,
  },
});

export default styles;
