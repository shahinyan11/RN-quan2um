import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  opacityView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },

  selfieMask: {
    width: 213,
    height: 332,
  },
  docMask: {
    width: 272,
    height: 348,
  },
});

export default styles;
