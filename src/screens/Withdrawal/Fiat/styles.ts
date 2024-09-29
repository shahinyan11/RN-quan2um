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
    marginVertical: scaledSize(10),
  },
  ibanStyle: {
    color: '$white50',
  },
  leftContainerStyle: {
    alignSelf: 'flex-start',
    marginTop: scaledSize(10),
  },
  feeStyle: {
    color: '$white50',
  },
  containerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
