import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    marginTop: scaledSize(24),
  },
  tabStyle: {
    marginRight: 10,
    backgroundColor: '$darkForms',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: scaledSize(5),
  },
  iconContainerStyle: {
    height: scaledSize(30),
    width: scaledSize(30),
    borderRadius: scaledSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
  },
  tabActiveStyle: {
    backgroundColor: '$primaryMain',
  },
  headerContainerStyle: {
    marginVertical: scaledSize(15),
  },
  contentContainerStyle: {
    marginTop: scaledSize(10),
  },
  tabContainerStyle: {
    paddingVertical: scaledSize(15),
  },
});

export default styles;
