import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_14} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    borderWidth: 0,
    marginTop: 20,
    borderRadius: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '$white50',
    marginBottom: 20,
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
    marginBottom: -0.5,
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
});

export default styles;
