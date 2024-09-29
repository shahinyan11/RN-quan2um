import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {t6} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    borderRadius: scaledSize(8),
    marginBottom: 20,
    marginTop: 12,
    overflow: 'hidden',
  },

  bonusAmount: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 5,
  },

  greenText: {
    color: 'rgba(0, 216, 157, 1)',
  },

  secondaryText: {
    color: '$white50',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  bottomText: {
    ...t6,
    flex: 1,
    fontWeight: '300',
    marginLeft: 10,
  },

  button: {
    marginVertical: 0,
  },
});

export default styles;
