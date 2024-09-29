import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 4,
  },
  btnContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$darkForms',
    padding: scaledSize(12),
    borderRadius: 8,
  },
  titleStyle: {
    marginLeft: 8,
    textTransform: 'uppercase',
    fontSize: scaledSize(9),
  },
  iconContainerStyle: {},
});

export default styles;
