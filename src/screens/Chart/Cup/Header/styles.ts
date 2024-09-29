import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12, Ub_reg_14} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  header: {},
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '$white50',
    paddingHorizontal: scaledSize(20),
  },

  mainTab: {
    padding: 0,
    flex: undefined,
    borderRadius: 0,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: undefined,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent',
  },
  mainTabActive: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#02AFFB',
  },

  mainTabText: {
    ...Ub_reg_14,
    fontWeight: '500',
    color: '$white',
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: scaledSize(20),
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderTabCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#747474',
    marginBottom: 10,
    height: 25,
  },

  orderTab: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: '100%',
  },

  orderTabActive: {
    borderRadius: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
    height: '100%',
  },

  bottomText: {
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$white50',
  },

  price: {
    paddingHorizontal: 5,
  },
});

export default styles;
