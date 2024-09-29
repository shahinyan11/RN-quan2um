import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {textSmall} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  imageContainerStyle: {
    height: scaledSize(56),
  },
  itemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    textTransform: 'uppercase',
    fontWeight: '500',
    marginVertical: scaledSize(24),
    color: '$white75',
  },
  insert: {
    ...textSmall,
    color: '$primaryMain',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  secretStyle: {
    marginVertical: scaledSize(8),
    color: '$white75',
  },
});

export default styles;
