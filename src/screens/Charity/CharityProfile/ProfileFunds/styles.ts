import EStyleSheet from 'react-native-extended-stylesheet';
import {t3} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  safeContainer: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
  container: {
    paddingVertical: 20,
  },

  tab: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '$blackTextLight',
    borderRadius: 40,
    marginBottom: scaledSize(20),
  },

  whiteTitle: {
    ...t3,
    color: '$white',
    fontWeight: '700',
  },

  whiteDescription: {
    color: '$white',
    marginTop: 12,
    marginBottom: 20,
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,

  flatList: {
    paddingHorizontal: scaledSize(20),
    marginTop: 24,
    marginBottom: 20,
  },
});

export default styles;
