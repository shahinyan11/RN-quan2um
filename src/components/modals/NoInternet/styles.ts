import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_18, Ub_reg_22} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '$blackBackground',
    alignItems: 'center',
  },

  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
  },

  logoContainer: {
    marginTop: 'auto',
  },

  sheet: {
    borderRadius: scaledSize(20),
    paddingTop: scaledSize(25),
    marginVertical: scaledSize(10),
    paddingHorizontal: scaledSize(25),
    width: '100%',
    backgroundColor: '$blackBackground',
  },

  image: {
    alignItems: 'center',
    height: scaledSize(170),
    resizeMode: 'contain',
  },

  title: {
    ...Ub_reg_22,
    fontWeight: '500',
    color: '$white',
    marginBottom: 20,
    marginTop: 15,
    textAlign: 'center',
  },

  desc: {
    ...Ub_reg_18,
    fontWeight: '300',
    color: '$white',
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: 50,
    marginBottom: 54,
  },
});

export default styles;
