import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginTop: 'auto',
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    backgroundColor: '$blackBackground',
    paddingTop: 20,
    minHeight: 200,
  },

  indicator: {
    height: 4,
    width: scaledSize(32),
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },

  content: {
    paddingHorizontal: scaledSize(20),
  },
});

export default styles;
