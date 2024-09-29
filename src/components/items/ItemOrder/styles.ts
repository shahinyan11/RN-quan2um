import fonts from '@constants/fonts';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  blockContainerStyle: {
    backgroundColor: '$white5',
    padding: scaledSize(6),
    flex: 1,
    margin: scaledSize(2),
    borderRadius: scaledSize(4),
  },
  labelStyle: {
    fontFamily: fonts.OSRegular,
    fontSize: scaledFontSize(10),
    color: '$white50',
    marginBottom: 5,
  },
  btnContainerStyle: {
    backgroundColor: '$red',
    paddingHorizontal: scaledSize(8),
    paddingVertical: scaledSize(4),
    borderRadius: scaledSize(4),
    marginLeft: scaledSize(10),
  },
  topContainerStyle: {
    marginBottom: scaledSize(4),
  },
  dateStyle: {
    color: '$white50',
  },
  iconLeftContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    zIndex: 10,
  },
  iconRightContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
  },
  rightContainerStyle: {
    zIndex: -10,
    left: scaledSize(8) * -1,
  },
  subtitleStyle: {
    color: '$white50',
  },
  progressBarStyle: {
    height: scaledSize(16),
    backgroundColor: '$white5',
    borderRadius: scaledSize(8),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  activeProgressStyle: {
    backgroundColor: '$primaryMain',
    flex: 1,
    width: '10%',
  },
  labelProgressBarStyle: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});

export default styles;
