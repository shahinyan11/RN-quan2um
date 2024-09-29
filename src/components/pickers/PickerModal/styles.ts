import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemContainerStyle: {
    height: scaledSize(56),
    backgroundColor: '$white5',
    marginVertical: scaledSize(4),
    borderRadius: scaledSize(8),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scaledSize(16),
  },
  pickerContainerStyle: {
    height: scaledSize(32),
    borderWidth: 1,
    borderColor: '$white10',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaledSize(8),
    borderRadius: scaledSize(8),
    //marginVertical: scaledSize(8),
    marginBottom: scaledSize(8),
  },
  pickerTitleStyle: {
    color: '$white75',
  },
});

export default styles;
