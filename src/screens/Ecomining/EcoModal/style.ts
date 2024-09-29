import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
  warningModalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  regularStyle: {
    color: '$white',
  },
  mininalText: {
    color: '$white50',
  },
  subMinimizedText: {
    color: '$white25',
    paddingHorizontal: scaledSize(5),
    marginTop: scaledSize(10),
  },
  modalContainer: {flex: 1, justifyContent: 'space-around'},
  modalInnputLabelStyle: {
    color: '$white25',
    paddingVertical: scaledSize(10),
    fontSize: scaledSize(10),
  },
  buttonContainer: {
    width: '100%',
  },
  warningButtonContainer: {
    marginTop: scaledSize(40),
    marginBottom: scaledSize(10),
  },
  warningText: {
    marginTop: scaledSize(20),
    paddingVertical: scaledSize(5),
    textAlign: 'center',
    lineHeight: scaledSize(23),
  },
  warningHighlightedText: {
    color: '#4CA7F8',
    paddingHorizontal: scaledSize(1),
  },
  cancelWarningButton: {
    width: scaledSize(150),
  },
  warningButtonConfirm: {
    width: scaledSize(150),
    backgroundColor: 'transparent',
  },
  warningButtonTitleStyle: {
    fontSize: scaledSize(12),
  },
  selectedDateRange: {color: '#349EFF', marginTop: 15, marginBottom: 20},
});

export default styles;
