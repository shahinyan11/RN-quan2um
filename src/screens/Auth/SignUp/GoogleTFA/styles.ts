import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    color: '$white75',
    marginBottom: scaledSize(24),
    marginTop: scaledSize(8),
  },

  containerStyle: {
    flex: 1,
  },
  secretStyle: {
    marginVertical: scaledSize(8),
    color: '$white75',
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default styles;
