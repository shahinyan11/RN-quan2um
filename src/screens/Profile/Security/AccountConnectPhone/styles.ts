import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  titleStyle: {
    marginVertical: scaledSize(16),
  },
  inpContainerStyle: {
    marginVertical: scaledSize(20),
  },
  mainContainerStyle: {
    flex: 1,
  },
});

export default styles;
