import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  itemContainerStyle: {
    marginVertical: scaledSize(8),
  },
  columnContainerStyle: {
    flex: 1,
  },
  labelStyle: {
    color: '$white50',
  },
  centerLabelStyle: {
    color: '$white50',
    textAlign: 'center',
  },
  rightLabelStyle: {
    color: '$white50',
    textAlign: 'right',
  },
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    backgroundColor: '$white10',
    borderRadius: 4,
    marginLeft: 12,
  },
  addressContainerStyle: {
    marginTop: scaledSize(12),
  },
  descriptionStyle: {
    flex: 1,
    marginLeft: 10,
    textAlign: 'right',
  },
});

export default styles;
