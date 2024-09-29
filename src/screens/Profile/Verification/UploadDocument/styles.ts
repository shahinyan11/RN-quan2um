import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    marginTop: scaledSize(24),
    marginBottom: scaledSize(10),
    textTransform: 'uppercase',
    color: '$white75',
  },
  label: {
    marginTop: scaledSize(20),
    textTransform: 'uppercase',
    color: '$white75',
  },
  subtitleStyle: {
    color: '$white50',
  },
  buttonContainerStyle: {
    height: scaledSize(50),
    borderRadius: scaledSize(10),
    marginTop: scaledSize(10),
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '$primaryMain',
  },
  imageContainerStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(10),
  },
  centerContainerStyle: {
    flex: 1,
    marginRight: scaledSize(12),
  },
  previewImage: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(10),
    marginRight: scaledSize(10),
  },
  commentContainerStyle: {
    marginTop: scaledSize(10),
  },
  labelStyle: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: '500',
  },
});

export default styles;
