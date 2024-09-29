import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  checkBoxContainerStyle: {
    borderWidth: 2,
    borderColor: 'silver',
    overflow: 'hidden',
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(8),
    marginRight: scaledSize(16),
  },
  checkBoxActiveStyle: {
    flex: 1,
    backgroundColor: '$primaryMain',
    margin: 1,
    borderRadius: scaledSize(8),
  },
  checkBoxTitleStyle: {
    color: '$white75',
  },
});

export default styles;
