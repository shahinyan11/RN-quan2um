import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: scaledSize(5),

    paddingVertical: scaledSize(8),

    backgroundColor: '#41405B',
    borderRadius: 8,
    width: scaledSize(120),
  },
  infoDescription: {
    textAlign: 'center',
  },
});

export default styles;
