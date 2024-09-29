import {
  OS_12,
  OS_20,
  t2,
  t3,
  t4,
  t5,
  Ub_reg_14,
  Ub_reg_20,
} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  title: {
    ...t2,
    color: '$white',
  },

  subTitle: {
    ...t3,
    color: '$white',
  },

  text: {
    ...t4,
    color: '$white75',
  },

  textAccent: {
    ...t4,
    color: '$greenLight',
  },

  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaledSize(28),
    marginBottom: scaledSize(22),
    padding: 10,
  },

  progressCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressText: {
    ...Ub_reg_20,
    fontWeight: '500',
    color: '$white',
    letterSpacing: -0.5,
  },

  progressTextSmall: {
    ...Ub_reg_14,
    color: '$white35',
    letterSpacing: -0.5,
  },

  checkMark: {
    position: 'absolute',
  },

  timeLabel: {
    display: 'none',
  },

  cardsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: scaledSize(20),
    justifyContent: 'space-between',
  },

  investContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
    marginTop: scaledSize(20),
    borderRadius: scaledSize(8),
    marginBottom: scaledSize(40),
    paddingTop: scaledSize(20),
    paddingBottom: scaledSize(8),
    paddingHorizontal: scaledSize(16),
  },

  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  countDownView: {
    justifyContent: 'center',
    backgroundColor: '#1F1F2D',
    paddingVertical: scaledSize(5),
    borderRadius: scaledSize(4),
  },

  countDownLabel: {
    ...t5,
    color: '$white35',
    letterSpacing: -0.5,
  },

  countdownDigits: {
    height: 22,
    paddingHorizontal: scaledSize(1),
    width: 'auto',
  },

  smallText: {
    ...OS_12,
    color: '$white',
    textAlign: 'center',
  },

  description: {
    marginTop: 20,
    marginBottom: 8,
  },

  gradientButton: {
    minHeight: scaledSize(48),
    height: 'auto',
    padding: 0,
  },

  gradientButtonContent: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.15)',
    padding: 8,
  },

  buttonBigText: {
    ...OS_20,
    color: '$white',
    fontWeight: '600',
  },

  buttonsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '$white1',
    borderStyle: 'solid',
    borderRadius: scaledSize(8),
    marginTop: scaledSize(20),
  },

  buttonContainer: {
    marginVertical: 0,
    flex: 1,
  },

  button: {
    backgroundColor: 'transparent',
  },

  buttonGray: {
    backgroundColor: '$gray',
  },

  historyTitle: {
    ...t4,
    color: '$white',
    marginBottom: scaledSize(20),
    marginTop: scaledSize(30),
  },
  emptyListContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$white1',
    height: scaledSize(98),
    borderRadius: scaledSize(4),
  },
});

export default styles;
