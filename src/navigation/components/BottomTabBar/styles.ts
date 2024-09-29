import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkBackground',
  },
  mainContainerStyle: {
    backgroundColor: '$gray',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scaledSize(72),
    paddingBottom: 10,
    paddingLeft: scaledSize(18),
    paddingRight: scaledSize(10),
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
