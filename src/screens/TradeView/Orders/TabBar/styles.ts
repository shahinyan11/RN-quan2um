import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$blackBackground',
    shadowColor: 'transparent',
  },

  indicator: {
    backgroundColor: '#02AFFB',
  },

  tab: {
    width: 'auto',
    paddingHorizontal: 0,
  },

  label: {
    textTransform: 'none',
    paddingHorizontal: 0,
    margin: 0,
  },
});

export default styles;
