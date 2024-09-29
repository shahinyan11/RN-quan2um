import {textSmall} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingHorizontal: scaledSize(16),
  },
  deviceStatusStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '$primaryMain',
    marginRight: 8,
  },
  deviceOfflineStatusStyle: {
    backgroundColor: '$white25',
  },
  rowContainerStyle: {
    marginVertical: 6,
  },
  labelStyle: {
    ...textSmall,
    color: '$white50',
  },
  activeTitleStyle: {
    color: '$green',
  },
  disabledTitleStyle: {
    color: '$red',
  },
});

export default styles;
