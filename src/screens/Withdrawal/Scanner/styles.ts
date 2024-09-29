import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  maskContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTopContainerStyle: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '$primaryMain',
    height: 48,
    width: 48,
    borderTopLeftRadius: 24,
  },
  leftBottomContainerStyle: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '$primaryMain',
    height: 48,
    width: 48,
    borderBottomLeftRadius: 24,
  },
  rightTopContainerStyle: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '$primaryMain',
    height: 48,
    width: 48,
    borderTopRightRadius: 24,
  },
  rightBottomContainerStyle: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '$primaryMain',
    height: 48,
    width: 48,
    borderBottomRightRadius: 24,
  },
  scannerContainerStyle: {
    width: 300,
    height: 300,
  },
});

export default styles;
