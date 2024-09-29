import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t2, t4, t6} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },

  sheet: {
    marginTop: 'auto',
    height: scaledSize(340),
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    paddingTop: scaledSize(10),
    paddingHorizontal: scaledSize(20),
    backgroundColor: '$blackBackground',
  },

  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    height: 4,
    width: scaledSize(32),
    marginBottom: scaledSize(24),
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  title: {
    ...t2,
    color: '$white',
    marginBottom: 20,
  },

  inputContainer: {
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '$white1',
    paddingHorizontal: scaledSize(20),
  },

  input: {
    ...t4,
    flex: 1,
    color: '$white',
  },

  textActive: {
    ...t4,
    color: '$blue',
  },

  textDark: {
    ...t4,
    color: '$white50',
  },

  textDarkSmall: {
    ...t6,
    color: '$white50',
  },

  textSmall: {
    ...t6,
    color: '$white',
  },

  after: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    height: '100%',
    width: 1,
    backgroundColor: '$white1',
    marginHorizontal: scaledSize(20),
  },

  buttonContainer: {
    marginTop: 35,
  },
});

export default styles;
