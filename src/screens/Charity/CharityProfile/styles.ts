import EStyleSheet from 'react-native-extended-stylesheet';
import {UbReg_14, UbReg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: scaledSize(4),
    backgroundColor: 'rgba(172, 228, 44, 1)',
    overflow: 'hidden',
    marginBottom: scaledSize(20),
  },
  cardLeft: {
    paddingTop: 5,
    paddingBottom: 16,
    paddingHorizontal: scaledSize(8),
  },

  cardTextLight: {
    ...UbReg_14,
    color: '$blackTextLight',
    marginTop: scaledSize(18),
    marginBottom: scaledSize(4),
    marginLeft: scaledSize(4),
  },
  cardText: {
    ...UbReg_16,
    color: '$blackText',
    fontWeight: '500',
    marginLeft: scaledSize(4),
  },

  cardImage: {
    height: '100%',
    resizeMode: 'stretch',
  },

  tabContainer: {
    marginTop: scaledSize(40),
    marginBottom: scaledSize(20),
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  cardContainer: {
    marginBottom: scaledSize(40),
  },
});

export default styles;
