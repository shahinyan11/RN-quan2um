import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    marginBottom: scaledSize(20),
  },
  flatList: {
    paddingHorizontal: scaledSize(20),
  },

  tabItem: {
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(12, 12, 12, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 9,
  },

  activeTabItem: {
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$greenBackground',
    paddingHorizontal: scaledSize(15),
    paddingVertical: 9,
  },

  tabText: {
    ...t4,
    color: 'rgba(12, 12, 12, 0.4)',
    letterSpacing: -0.4,
  },

  activeTabText: {
    ...t4,
    fontWeight: '500',
    color: '$blackText',
    letterSpacing: -0.4,
  },
});

export default styles;
