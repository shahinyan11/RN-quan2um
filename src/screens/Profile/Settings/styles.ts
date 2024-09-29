import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  btnLogoutStyle: {
    backgroundColor: '$darkForms',
    height: scaledSize(48),
  },
  btnTitleStyle: {
    color: '$red',
  },

  label: {
    color: '$white',
    fontSize: scaledSize(14),
  },

  save: {
    color: '$blue',
    fontSize: scaledSize(14),
    marginLeft: scaledSize(15),
  },

  itemContainerStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  checkboxContainer: {
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
