import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  sheet: {
    marginTop: 'auto',
    height: scaledSize(400),
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    paddingTop: scaledSize(10),
    paddingBottom: 30,
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
    marginBottom: scaledSize(20),
    marginTop: scaledSize(10),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaledSize(20),
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '$white50',
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});

export default styles;
