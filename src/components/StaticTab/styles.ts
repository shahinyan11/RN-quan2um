import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
    borderColor: '$blackTextLight',
  },

  tabItem: {
    flex: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: scaledSize(40),
  },

  activeTabItem: {
    flex: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: scaledSize(40),
    backgroundColor: '$blackText',
  },

  text: {
    color: '$blackText',
  },
  activeText: {
    color: '$white',
  },
});

export default styles;
