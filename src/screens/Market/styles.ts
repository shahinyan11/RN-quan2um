import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    paddingHorizontal: scaledSize(16),
    backgroundColor: '$darkBackground',
  },
  headerContainerStyle: {
    marginVertical: scaledSize(16),
  },
});

export const pairStyle = EStyleSheet.create({
  head: {
    paddingLeft: scaledSize(6),
    paddingRight: scaledSize(15),
    marginBottom: 20,
  },

  containerStyle: {
    height: 58,
    backgroundColor: '$gray',
    paddingLeft: scaledSize(6),
    paddingRight: scaledSize(15),
    borderRadius: scaledSize(8),
    borderWidth: 1,
    borderColor: '$white1',
  },
  leftIconContainerStyle: {
    width: scaledSize(25),
    height: scaledSize(25),
    zIndex: 20,
  },
  rightIconContainerStyle: {
    width: scaledSize(25),
    height: scaledSize(25),
  },
  rightContainerStyle: {
    left: -7,
    zIndex: -5,
  },
  textStyle: {
    fontSize: scaledFontSize(11),
    fontWeight: '500',
    color: '$white',
  },
  leftBlockContainerStyle: {
    flex: 2,
  },
  centerBlockContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  rightBlockContainerStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleStyle: {
    fontSize: scaledFontSize(8),
    color: '$white25',
  },
  pairTitleStyle: {
    flex: 1,
  },
});

export default styles;
