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
  subtitleStyle: {
    marginVertical: scaledSize(20),
  },
});

export default styles;
