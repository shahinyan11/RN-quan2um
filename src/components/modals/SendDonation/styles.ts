import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t2, t4, t6} from '@constants/globalStyles';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  sheet: {
    marginTop: 'auto',
    paddingBottom: 55,
    backgroundColor: '$white',
    paddingTop: scaledSize(10),
    paddingHorizontal: scaledSize(20),
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
  },

  indicator: {
    height: 4,
    marginBottom: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: scaledSize(32),
    backgroundColor: 'rgba(147, 147, 147, 0.13)',
  },

  text: {
    color: '$blackText',
  },

  textLight: {
    color: '$blackTextLight',
  },

  title: {
    ...t2,
    marginBottom: 20,
  },

  textActive: {
    ...t4,
    color: '#ACE42C',
  },

  textUnderline: {
    ...t6,
    color: '$blackText',
    textDecorationLine: 'underline',
  },

  inputContainerStyle: {
    borderColor: '$blackTextLight',
  },

  after: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    width: 1,
    height: '100%',
    backgroundColor: '$blackTextLight',
    marginHorizontal: scaledSize(20),
  },

  button: {
    ...simpleGreen.container,
    marginTop: 20,
  },

  buttonText: simpleGreen.text,
});

export default styles;
