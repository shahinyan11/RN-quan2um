import {t3} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    height: scaledSize(110),
    paddingTop: scaledSize(14),
    paddingLeft: scaledSize(12),
    borderRadius: scaledSize(4),
    paddingRight: scaledSize(16),
  },
  title: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
    position: 'relative',
    flex: 1,
  },

  valueText: {
    ...t3,
    color: 'white',
    paddingRight: 4,
    position: 'absolute',
  },

  input: {
    ...t3,
    width: '90%',
    textAlign: 'right',
    color: 'white',
    // color: 'rgba(255,0,0,1)',
  },

  icon: {
    marginRight: scaledSize(8),
  },
});

export default styles;
