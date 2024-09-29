import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {},
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //  paddingVertical: 8,
  },
  titleStyle: {
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: '$primaryMain',
  },
  disabledTitleStyle: {
    color: '$white25',
  },
});

export default styles;
