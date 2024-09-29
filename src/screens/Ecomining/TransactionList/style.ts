import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    marginVertical: scaledSize(10),
    textAlignVertical: 'center',
  },
  safeScrollContainerStyle: {
    paddingHorizontal: scaledSize(16),
  },

  typeTransaction: {
    maxWidth: '100%',
  },
  itemSecondary: {
    color: '$white50',
    paddingRight: scaledSize(1),
  },
  balanceText: {
    //color: '$white50',
  },
  mininalText: {
    paddingTop: scaledSize(2),
    paddingLeft: scaledSize(2),
  },
  greenHightLightedText: {
    color: '#00FF75',
  },

  nodeTitle: {
    marginTop: scaledSize(5),
    marginBottom: scaledSize(35),
  },
  showAllListBtn: {
    color: '#349EFF',
    textAlign: 'center',
    marginTop: scaledSize(20),
  },
  arrowLeft: {
    marginVertical: scaledSize(10),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default styles;
