import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  inactiveCheckBox: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '$white50',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scaledSize(15),
  },
  activeCheckBox: {
    borderWidth: 1,
    backgroundColor: '$primaryMain',
    borderColor: '$primaryMain',
  },
  containerStyle: {},
  titleStyle: {
    flex: 1,
  },
});

export default styles;
