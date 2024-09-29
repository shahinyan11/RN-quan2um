import EStyleSheet from 'react-native-extended-stylesheet';
import {OS_14, OS_20, t3, t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  safeContainer: {
    backgroundColor: '$white',
  },
  container: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  card: {
    borderRadius: 8,
    paddingTop: 23,
    paddingHorizontal: scaledSize(16),
    backgroundColor: 'rgba(188, 239, 70, 1)',
  },
  cardTitle: {
    ...OS_20,
    marginBottom: 12,
  },

  cardText: OS_14,

  cardImage: {
    marginTop: 20,
    alignSelf: 'center',
    height: 178,
  },

  blackBox: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: scaledSize(16),
    backgroundColor: '$blackText',
    marginBottom: 40,
    marginTop: 32,
  },

  tabItem: {
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(12, 12, 12, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 9,
  },

  activeTabItem: {
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$greenBackground',
    paddingHorizontal: scaledSize(15),
    paddingVertical: 9,
  },

  tabText: {
    ...t4,
    color: 'rgba(12, 12, 12, 0.4)',
    letterSpacing: -0.4,
  },

  activeTabText: {
    ...t4,
    fontWeight: '500',
    color: '$blackText',
    letterSpacing: -0.4,
  },

  whiteTitle: {
    ...t3,
    color: '$white',
    fontWeight: '700',
  },

  whiteDescription: {
    color: '$white',
    marginTop: 12,
    marginBottom: 20,
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,

  flatList: {
    paddingHorizontal: scaledSize(20),
    marginTop: 24,
    marginBottom: 20,
  },
});

export default styles;
