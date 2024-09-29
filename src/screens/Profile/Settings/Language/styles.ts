import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  languageContainerStyle: {
    height: scaledSize(56),
    paddingHorizontal: 16,
  },
  activeLanguageContainerStyle: {
    backgroundColor: '$darkForms',
  },
});

export default styles;
