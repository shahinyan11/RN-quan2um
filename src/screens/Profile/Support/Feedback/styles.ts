import {t5} from '@constants/globalStyles';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  feedbackContainerStyle: {
    minHeight: scaledSize(120),
  },
  inputContainerStyle: {
    marginVertical: scaledSize(30),
  },
  inputMessageStyle: {
    textAlignVertical: 'top',
    height: '100%',
  },
  labelStyle: {
    ...t5,
    color: '$white75',
    fontSize: scaledFontSize(9),
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  pickerContainerStyle: {
    marginTop: scaledSize(32),
  },
  pickerInputContainerStyle: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: scaledSize(8),
    borderRadius: scaledSize(8),
  },
  mainContainerStyle: {
    flex: 1,
  },
  imageStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    overflow: 'hidden',
    borderRadius: scaledSize(8),
  },
  pictureNameStyle: {
    marginHorizontal: scaledSize(12),
  },
  imageWrapper: {
    backgroundColor: '$darkForms',
    borderRadius: 12,
    padding: 10,
  },
});

export default styles;
