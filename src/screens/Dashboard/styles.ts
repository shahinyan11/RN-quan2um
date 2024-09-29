import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils/scaledSize';
import {t6} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  secondContainer: {
    paddingHorizontal: scaledSize(16),
  },
  iconContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(12),
    backgroundColor: '$darkForms',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scaledSize(8),
  },
  headerContainerStyle: {
    paddingHorizontal: scaledSize(8),
    marginVertical: scaledSize(15),
  },
  columnStyle: {
    flex: 2,
  },
  columnCenterStyle: {
    flex: 1,
  },
  headerPairsContainerStyle: {
    marginBottom: scaledSize(16),
  },
  titleStyle: {
    color: '$white25',
  },
  btnContainerStyle: {
    backgroundColor: '$darkForms',
    padding: scaledSize(16),
    borderRadius: scaledSize(12),
    marginBottom: scaledSize(16),
  },
  subtitleStyle: {
    color: '$white50',
    marginTop: scaledSize(8),
  },
  nextContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(12),
  },
  replenishHint: {
    marginTop: scaledSize(8),
    color: '$white50',
  },
  gradientCardWide: {
    position: 'relative',
    height: 150,
    justifyContent: 'center',
    paddingLeft: scaledSize(20),
    borderRadius: scaledSize(8),
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
  },
  gradientCardNarrow: {
    paddingTop: 21,
    marginBottom: 20,
    width: scaledSize(160),
    paddingLeft: scaledSize(10),
    borderRadius: scaledSize(8),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
    height: 235,
  },

  frameImg: {
    right: 5,
    position: 'absolute',
  },
  cardText: {
    ...t6,
    fontWeight: '300',
    color: '$white',
    maxWidth: scaledSize(175),
    marginTop: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  charityCard: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scaledSize(10),
    borderRadius: scaledSize(8),
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '$white1',
  },

  charityImg: {
    alignSelf: 'flex-end',
    marginLeft: scaledSize(10),
  },

  containerPairs: {
    marginBottom: scaledSize(20),
  },
  pickerContainerStyle: {
    backgroundColor: '$darkForms',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  hintStyle: {
    color: '$white50',
    marginTop: scaledSize(8),
  },
  haveUnreadMessages: {
    position: 'absolute',
    zIndex: 100,
    width: scaledSize(10),
    height: scaledSize(10),
    borderRadius: scaledSize(5),
    right: scaledSize(15),
    top: scaledSize(5),
    backgroundColor: '$primaryMain',
  },
});

export default styles;
