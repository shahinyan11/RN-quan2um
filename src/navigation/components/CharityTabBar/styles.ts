import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$white',
  },
  mainContainerStyle: {
    backgroundColor: '$white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scaledSize(91),
    paddingBottom: 24,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
