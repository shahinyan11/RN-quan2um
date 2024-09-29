import {scaledSize} from '@utils/scaledSize';
import {Dimensions} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainerStyle: {
    width: width / 2 - scaledSize(32),
    backgroundColor: '$white5',
    height: scaledSize(48),
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  titleStyle: {
    textTransform: 'uppercase',
    fontWeight: '500',
    marginVertical: scaledSize(24),
    color: '$white75',
  },
  hintStyle: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default styles;
