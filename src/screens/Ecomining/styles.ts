import {t6} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  containerStyle: {
    paddingHorizontal: scaledSize(16),
    paddingBottom: 40,
    paddingTop: 20,
  },

  darkText: {
    ...t6,
    fontWeight: '300',
    color: '$white50',
    marginBottom: 10,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },

  nodeTitle: {
    marginBottom: scaledSize(30),
  },

  showAllListBtn: {
    backgroundColor: '#292839',
  },
});
