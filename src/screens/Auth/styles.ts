import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    marginTop: scaledSize(32),
    marginBottom: scaledSize(16),
  },
  sfContainerStyle: {
    paddingTop: scaledSize(65),
    padding: scaledSize(24),
  },
  leftSocialContainerStyle: {
    flex: 1,
    backgroundColor: 'rgb(45,44,56)',
    height: scaledSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 24,
  },
  topContainerStyle: {
    flex: 1,
  },
  rightSocialContainerStyle: {
    flex: 1,
    backgroundColor: 'rgb(45,44,56)',
    height: scaledSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnContainerStyle: {
    marginBottom: scaledSize(32),
  },
  linkStyle: {
    color: '$primaryMain',
  },
  title: {
    color: '$darkBackground',
    textTransform: 'none',
  },
  socialButton: {
    backgroundColor: '$white',
  },
});

export default styles;
