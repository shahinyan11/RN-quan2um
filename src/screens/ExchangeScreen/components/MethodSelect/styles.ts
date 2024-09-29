import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  sheet: {
    marginTop: 'auto',
    flex: 0.7,
    borderTopEndRadius: scaledSize(20),
    borderTopStartRadius: scaledSize(20),
    paddingTop: scaledSize(10),
    backgroundColor: '$blackBackground',
  },

  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    height: 4,
    width: scaledSize(32),
    marginBottom: scaledSize(24),
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  title: {
    marginBottom: scaledSize(20),
    marginTop: scaledSize(10),
    marginLeft: scaledSize(20),
  },

  flatListContainer: {
    paddingHorizontal: scaledSize(15),
    marginHorizontal: scaledSize(5),
  },

  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaledSize(20),
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '$white50',
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    marginHorizontal: 15,
    flex: 1,
  },
});

export default styles;
