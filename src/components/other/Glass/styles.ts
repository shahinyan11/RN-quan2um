import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height} = Dimensions.get('window');

const styles = EStyleSheet.create({
  labelStyle: {
    color: '$white50',
  },
  progressBarStyle: {
    position: 'absolute',
    zIndex: -10,
    backgroundColor: '$red25',
    right: 0,
    top: 0,
    bottom: 0,
    width: '0%',
  },
  itemContainerStyle: {
    height: scaledSize(20),
    marginVertical: scaledSize(2),
  },

  linkContainerStyle: {
    marginVertical: scaledSize(10),
    fontSize: scaledFontSize(9),
    color: '$primaryMain',
    textTransform: 'uppercase',
  },
  containerStyle: {
    height: height * 0.5,
  },
});

export default styles;
