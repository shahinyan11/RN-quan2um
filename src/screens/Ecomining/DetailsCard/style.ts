import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginBottom: scaledSize(12),
  },
  cardContainerStyle: {
    backgroundColor: '$darkForms',
    padding: scaledSize(16),
    borderRadius: scaledSize(12),
    marginBottom: scaledSize(16),
  },
  label: {
    paddingVertical: scaledSize(2),
  },
  subLabelLink: {
    paddingBottom: scaledSize(12),
    color: '$white50',
  },
  shareIcon: {
    paddingLeft: scaledSize(5),
  },
  divisorLine: {
    height: 1,
    width: '100%',
    backgroundColor: '$white10',
    alignSelf: 'stretch',
    marginVertical: scaledSize(15),
  },

  rowContainerStyle: {
    paddingVertical: scaledSize(5),
    flex: 1,
    alignItems: 'flex-end',
  },
  textContext: {
    color: '$white50',
  },
  balanceText: {
    color: '$white50',
    paddingLeft: scaledSize(8),
  },
  mininalText: {
    textAlignVertical: 'bottom',
    paddingLeft: scaledSize(2),
  },
  greenHightLightedText: {
    color: '#00FF75',
    paddingLeft: scaledSize(8),
  },
  redHightLightedText: {
    color: '$red',
    paddingLeft: scaledSize(4),
  },
  butttonTitleStyle: {
    fontSize: scaledSize(12),
  },
  disabledTitleStyle: {
    color: '#D4D4D4',
  },
});
export default styles;
