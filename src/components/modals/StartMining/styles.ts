import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t4, t6} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },

  sheet: {
    marginTop: 'auto',
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    paddingTop: scaledSize(10),
    paddingHorizontal: scaledSize(20),
    backgroundColor: '$blackBackground',
    paddingBottom: 48,
  },

  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    height: 4,
    width: scaledSize(32),
    marginBottom: scaledSize(24),
    marginLeft: 'auto',
    marginRight: 'auto',
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

  tabContainer: {
    marginBottom: 35,
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

  textGreen: {
    ...t4,
    color: '#00D89D',
  },

  text: {
    ...t4,
    color: '$white',
  },

  textDark: {
    ...t4,
    color: '$white50',
  },

  textSmall: {
    ...t6,
    fontWeight: '300',
    marginLeft: 10,
    color: '$white',
    letterSpacing: -0.32,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 8,
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
    marginVertical: 0,
    marginTop: 25,
  },
});

export default styles;
