import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {UbReg_16, UbReg_22} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    marginTop: 'auto',
    width: '100%',
  },

  sheet: {
    marginTop: 'auto',
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    paddingTop: 10,
    paddingHorizontal: scaledSize(20),
    backgroundColor: '$blackBackground',
    paddingBottom: 48,
    minHeight: 328,
  },

  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    height: 4,
    width: scaledSize(32),
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  title: {
    ...UbReg_22,
    color: '$white',
    fontWeight: '500',
    letterSpacing: -scaledSize(0.32),
    marginBottom: 20,
  },

  text: {
    ...UbReg_16,
    color: '$white',
    fontWeight: '400',
    lineHeight: scaledSize(16) * 1.4,
    letterSpacing: -scaledSize(0.32),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    marginVertical: 0,
    flex: 0.485,
  },
});

export default styles;
