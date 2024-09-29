import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  boxContainerStyle: {
    flex: 1,
  },
  itemContainerStyle: {
    height: scaledSize(36),
  },
  iconContainerStyle: {
    width: scaledSize(30),
    height: scaledSize(30),
  },
  itemInfoContainerStyle: {
    marginVertical: scaledSize(6),
  },
  labelStyle: {
    color: 'rgba(255,255,255,0.5)',
  },
});

export default styles;
