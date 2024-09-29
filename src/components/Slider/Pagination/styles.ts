import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const st = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: scaledSize(45),
  },
  containerVertical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignSelf: 'center',
  },
  item: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: '$white50',
    overflow: 'hidden',
  },
  activeView: {
    backgroundColor: '$white',
    flex: 1,
  },
});

export default st;
