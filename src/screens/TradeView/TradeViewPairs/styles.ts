import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemContainerStyle: {
    paddingVertical: scaledSize(8),
  },
  dividerStyle: {
    marginVertical: scaledSize(8),
  },
  titleStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(8),
  },
  inputSearchContainerStyle: {
    marginTop: scaledSize(8),
  },
  backIconContainerStyle: {
    width: scaledSize(32),
    height: scaledSize(32),
    backgroundColor: '$darkForms',
  },
  itemFilterContainerStyle: {
    width: scaledSize(60),
    minHeight: scaledSize(24),
    backgroundColor: '$white5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledSize(8),
    borderRadius: scaledSize(6),
  },
  itemFilterSelectedContainerStyle: {
    backgroundColor: '$primaryMain',
  },
  filterCurrencyContainerStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(8),
  },
  iconLeftContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    zIndex: 10,
  },
  iconRightContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
  },
  rightContainerStyle: {
    zIndex: -10,
    left: scaledSize(8) * -1,
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
