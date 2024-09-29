import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/index';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(12),
  },
  buttonContainerStyle: {
    minHeight: scaledSize(48),
    backgroundColor: '$primaryMain',
    padding: scaledSize(10),
    borderRadius: scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancelContainerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '$red',
  },
  buttonPressedContainerStyle: {
    backgroundColor: '$primaryFocus',
  },
  buttonDisabledContainerStyle: {
    backgroundColor: '$white5',
  },
  titleStyle: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  titleDisabledStyle: {
    color: '$white25',
  },
  iconContainerStyle: {
    marginRight: scaledSize(18),
  },
  titleCancelStyle: {
    color: '$red',
  },
});

export default styles;
