import {scaledSize} from '@utils/scaledSize';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerRightContainerStyle: {
    marginRight: scaledSize(16),
  },
  headerRightTitleStyle: {
    color: '$primaryMain',
  },
  topContainerStyle: {
    minHeight: scaledSize(120),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomContainerStyle: {
    alignItems: 'center',
  },
  leftBlockContainerStyle: {
    flex: 1,
    marginRight: 16,
  },
  rightBlockContainerStyle: {
    flex: 1,
  },
  labelStyle: {
    textTransform: 'uppercase',
    color: '$white25',
  },
  valueStyle: {
    marginVertical: 4,
  },
  amountStyle: {
    color: '$white50',
    textAlign: 'center',
  },
  iconCashContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(20),
  },
  headerContainerStyle: {
    //minHeight: scaledSize(250),
    paddingHorizontal: scaledSize(16),
  },
  headerTransactionStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(12),
  },
  bottomNavigationContainerStyle: {
    paddingHorizontal: scaledSize(16),
    marginBottom: scaledSize(20),
  },
  iconCurrencyContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: scaledSize(30),
    height: scaledSize(30),
  },
});

export default styles;
