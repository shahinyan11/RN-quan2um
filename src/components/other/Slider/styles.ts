import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = EStyleSheet.create({
  containerStyle: {
    height: scaledSize(150),
    marginBottom: scaledSize(16),
  },
  imageContainerStyle: {
    width: width - scaledSize(32),
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: scaledSize(16),
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  paginationContainerStyle: {
    marginTop: scaledSize(8),
  },
  activePageStyle: {
    width: scaledSize(32),
    height: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: scaledSize(8),
  },
  inactivePageStyle: {
    width: scaledSize(32),
    height: 2,
    borderRadius: 5,
    backgroundColor: '$white10',
    marginHorizontal: scaledSize(8),
  },
});

export default styles;
