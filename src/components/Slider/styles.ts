import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const st = EStyleSheet.create({
  dotesRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scaledSize(45),
    alignSelf: 'center',
  },
});

export default st;
