import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {OS_10, OS_8, UbReg_16} from '@constants/globalStyles';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: scaledSize(20),
  },

  stepIndicator: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: scaledSize(37),
    borderBottomWidth: 1,
    borderBottomColor: '#5F5F5F',
    marginBottom: scaledSize(30),
  },

  left: {
    alignItems: 'center',
  },

  right: {
    marginLeft: scaledSize(20),
    justifyContent: 'space-between',
  },

  stepCircle: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#3B3B54',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#0DAAFF',
  },

  stepLine: {
    width: scaledSize(2),
    height: scaledSize(32),
    backgroundColor: '#3B3B54',
  },

  stepLineActive: {
    backgroundColor: '#0DAAFF',
  },

  stepText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(93, 93, 133, 0.5)',
  },
  stepTextActive: {
    color: '$white',
  },

  stepLabel: {
    ...OS_10,
    fontWeight: '600',
    color: '$white35',
    lineHeight: 14,
  },
  stepLabelActive: {
    color: '$white',
  },

  circleContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },

  posAbs: {
    position: 'absolute',
  },

  timeTitle: {
    fontFamily: fonts.OSRegular,
    fontSize: scaledFontSize(8),
    color: '$white50',
    fontWeight: '600',
    marginBottom: scaledSize(5),
  },
  timeValue: {
    fontFamily: fonts.OSRegular,
    fontSize: scaledFontSize(12),
    color: '$white50',
    fontWeight: '600',
  },
  text: {
    ...UbReg_16,
    color: '$white',
    fontWeight: '400',
    lineHeight: scaledSize(16) * 1.4,
    letterSpacing: -scaledSize(0.32),
  },

  darkText: {
    ...OS_8,
    color: '$white50',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    marginVertical: 0,
    flex: 0.485,
  },
});

export default styles;
