import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {SCREEN_WIDTH} from '@constants/deviceInfo';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: scaledSize(20),
    backgroundColor: '$darkBackground',
  },
  tab: {
    marginBottom: 20,
  },
  scrollContainer: {
    paddingTop: 5,
  },
  label: {
    color: '$white50',
    marginBottom: 8,
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledSize(32),
    flexWrap: 'wrap',
  },
  text: {
    color: '$white50',
  },
  digit: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 'auto',
  },
  digitTxt: {
    color: 'white',
  },

  errorText: {
    fontSize: scaledFontSize(12),
    color: '$red',
    letterSpacing: -0.3,
  },
  expectedBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 24,
  },

  mr15: {
    marginRight: 15,
  },

  loaderView: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$black01',
    alignSelf: 'center',
  },
});

export default styles;
