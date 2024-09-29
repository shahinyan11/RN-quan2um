import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: scaledSize(16),
    justifyContent: 'space-between',
  },
  subtitleStyle: {
    color: '$white50',
    marginRight: 5,
  },
});

export default styles;
