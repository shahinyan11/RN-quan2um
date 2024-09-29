import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {t2, t3, t4, t6} from '@constants/globalStyles';
import {TextStyle, ViewStyle} from 'react-native';

const field: ViewStyle = {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '$white1',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 50,
  marginTop: 15,
  backgroundColor: '$gray',
};

const text: TextStyle = {
  ...t4,
  color: '$white',
  textAlign: 'center',
};

const styles = EStyleSheet.create({
  description: {
    ...t4,
    color: '$white50',
    paddingTop: 10,
    paddingBottom: scaledSize(35),
  },
  container: {
    backgroundColor: 'rgba(46, 46, 65, 1)',
    marginBottom: scaledSize(20),
    paddingHorizontal: scaledSize(25),
    paddingVertical: 20,
    width: '100%',
    borderRadius: 8,
  },
  infoTitle: {
    ...t4,
    color: '$white',
    marginBottom: scaledSize(10),
  },

  infoField: {
    ...field,
  },
  infoFieldDark: {
    ...field,
    backgroundColor: 'rgba(58, 57, 75, 1)',
  },
  row: {
    flexDirection: 'row',
  },
  morInfoText: {
    ...t6,
    color: 'rgba(149, 216, 231, 1)',
    marginBottom: 25,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },

  grayText: {
    ...t4,
    color: '$white50',
    marginBottom: 10,
  },
  whiteText: {
    ...text,
  },
  greenText: {
    ...t2,
    paddingVertical: 15,
    color: 'rgba(7, 166, 73, 1)',
  },
  blueText: {
    ...t2,
    paddingVertical: 15,
    color: 'rgba(9, 171, 252, 1)',
  },

  centered: {
    alignItems: 'center',
  },

  valueText: {
    ...text,
    marginTop: 15,
  },

  historyTitle: {
    ...t3,
    color: '$white',
    marginTop: 50,
    marginBottom: 25,
  },
});

export default styles;
