import {scaledSize} from '@utils/scaledSize';

import EStyleSheet from 'react-native-extended-stylesheet';
import {t6} from '@constants/globalStyles';

export const stylesWalletSettings = EStyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
});

const styles = EStyleSheet.create({
  topContainerStyle: {
    height: scaledSize(200),
  },
  controlPanelContainerStyle: {
    marginVertical: scaledSize(20),
  },

  buttonTitle: {
    marginLeft: 8,
    textTransform: 'uppercase',
    fontSize: scaledSize(9),
  },

  rowItemContainer: {
    flex: 1,
    marginHorizontal: 4,
  },

  rowItemContentContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  eyeContainerStyle: {
    flex: 0,
    width: scaledSize(40),
  },

  gradientCard: {
    marginBottom: 20,
    paddingHorizontal: scaledSize(20),
    paddingVertical: scaledSize(40),
    borderRadius: scaledSize(8),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
  },

  cardText: {
    ...t6,
    fontWeight: '300',
    color: '$white',
    maxWidth: scaledSize(180),
    marginTop: 10,
  },

  cardImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 90,
  },

  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '$white25',
    marginHorizontal: 8,
  },
  paginationContainerStyle: {
    marginVertical: scaledSize(20),
    justifyContent: 'center',
  },
  activeDotStyle: {
    backgroundColor: 'white',
  },
  checkboxContainerStyle: {
    marginLeft: 0,
    marginRight: 5,
  },
  filtersContainerStyle: {
    marginTop: 5,
    marginBottom: 10,
  },
  checkBoxContainer: {
    flex: 1,
  },
});

export default styles;
