import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  modalContainerStyle: {
    paddingHorizontal: scaledSize(16),
  },
  itemContainerStyle: {
    height: scaledSize(40),
    justifyContent: 'center',
  },
  inputSearchContainerStyle: {
    flex: 1,
  },
  iconBackContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    //alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    marginRight: 15,
  },
  headerContainerStyle: {
    marginBottom: 20,
  },
  labelStyle: {
    color: '$white75',
  },
  containerStyle: {},
});

export default styles;
