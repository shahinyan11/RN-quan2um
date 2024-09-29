import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  leftButtonContainerStyle: {
    marginRight: scaledSize(8),
  },
  btnContainerStyle: {
    marginBottom: scaledSize(8),
  },
  labelStyle: {
    color: '$white50',
    fontSize: scaledFontSize(12),
    marginVertical: scaledSize(8),
  },
  chartContainerStyle: {
    //height: scaledSize(208),
  },
  leftBlockContainerStyle: {
    marginRight: 15,
  },
  balanceContainerStyle: {
    marginVertical: scaledSize(12),
  },
  iconContainerStyle: {
    //padding: scaledSize(8),
    width: scaledSize(40),
    height: scaledSize(40),
    backgroundColor: '$darkForms',
    borderRadius: scaledSize(8),
    marginRight: scaledSize(8),
  },
  topContainerStyle: {
    marginBottom: scaledSize(12),
  },
  endIconStyle: {
    marginRight: 0,
  },
  btnSubmitContainerStyle: {
    height: scaledSize(40),
    borderRadius: scaledSize(8),

    marginTop: scaledSize(40),
  },
});

export default styles;
