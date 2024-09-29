import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$gray',
    marginTop: scaledSize(24),
    borderRadius: scaledSize(8),
    paddingVertical: scaledSize(24),
    paddingHorizontal: scaledSize(20),
  },
  currenciesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCard: {
    width: '100%',
    marginBottom: 12,
    borderRadius: scaledSize(4),
    backgroundColor: '$blackBackground',
  },
  bottomCard: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
    borderRadius: scaledSize(4),
  },
  changeButton: {
    borderWidth: 2,
    borderStyle: 'solid',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '$gray',
    justifyContent: 'center',
    width: scaledSize(38),
    height: scaledSize(38),
    borderColor: '$blackBackground',
    borderRadius: scaledSize(38),
  },
  rate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaledSize(12),
    borderRadius: scaledSize(4),
    paddingLeft: scaledSize(12),
    paddingRight: scaledSize(16),
    backgroundColor: '$blackBackground',
    paddingVertical: scaledSize(8),
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  address: {
    color: '$white50',
    marginRight: scaledSize(6),
  },
  checkAccuracy: {
    marginTop: 24,
    paddingLeft: scaledSize(12),
  },
  link: {
    fontFamily: fonts.UbuntuMedium,
    fontSize: scaledFontSize(22),
    textDecorationLine: 'underline',
    color: 'rgba(96, 131, 249, 1)',
    marginTop: 12,
  },
});

export default styles;
