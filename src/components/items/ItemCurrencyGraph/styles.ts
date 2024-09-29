import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkForms',
    borderRadius: scaledSize(12),
    padding: scaledSize(12),
    justifyContent: 'space-between',
    marginRight: scaledSize(16),
  },
  iconContainerStyle: {
    height: scaledSize(40),
    width: scaledSize(40),
    backgroundColor: 'red',
    borderRadius: scaledSize(12),
    marginRight: scaledSize(12),
  },
  topContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaledSize(10),
  },
  currencyStyle: {
    color: '$white50',
  },
  trendingProcentStyle: {
    fontWeight: '400',
  },
  increaseStyle: {
    color: '$green',
  },
  decreaseStyle: {
    color: '$red',
  },
  iconDecreaseContainerStyle: {
    transform: [{rotateX: '180deg'}, {rotateY: '180deg'}],
  },
});

export default styles;
