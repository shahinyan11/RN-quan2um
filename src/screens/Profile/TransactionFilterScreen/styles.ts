import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  topContainer: {
    flex: 1,
  },
  dateContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  leftDateInput: {
    flex: 0.49,
  },

  statusText: {
    color: '$yellow',
    textTransform: 'capitalize',
  },

  mb16: {
    marginBottom: 16,
  },

  textDark: {
    color: '$white50',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGray: {
    backgroundColor: '$gray',
  },
});

export default styles;
