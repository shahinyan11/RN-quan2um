import EStyleSheet from 'react-native-extended-stylesheet';
import {OS_14, OS_20} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  card: {
    borderRadius: 8,
    paddingTop: 23,
    paddingHorizontal: scaledSize(16),
    backgroundColor: 'rgba(188, 239, 70, 1)',
  },
  cardTitle: {
    ...OS_20,
    marginBottom: 12,
  },
  cardText: {
    ...OS_14,
  },

  cardImage: {
    marginTop: 20,
    alignSelf: 'center',
    height: 178,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
});

export default styles;
