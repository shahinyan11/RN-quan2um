import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemContainerStyle: {
    height: scaledSize(56),
    paddingHorizontal: 16,
  },
  activeItemContainerStyle: {
    backgroundColor: '$darkForms',
  },
});

export default styles;
