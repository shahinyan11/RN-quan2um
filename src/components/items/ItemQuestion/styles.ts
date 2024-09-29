import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  statusTitleStyle: {
    textTransform: 'uppercase',
  },
  statusContainerStyle: {
    paddingHorizontal: scaledSize(8),
    paddingVertical: scaledSize(4),
    borderRadius: 4,
  },

  titleSuccessStyle: {
    color: '$green',
  },
  titleErrorStyle: {
    color: '$red',
  },
  titleAlertStyle: {
    color: '$yellow',
  },
  statusSuccessBackground: {
    backgroundColor: '$green25',
  },
  statusErrorBackground: {
    backgroundColor: '$red25',
  },
  statusAlertBackground: {
    backgroundColor: '$yellow25',
  },
  titleStyle: {
    flex: 1,
    marginHorizontal: scaledSize(5),
    textAlign: 'center',
  },
  commentStyle: {
    marginTop: scaledSize(16),
    color: '$white75',
  },
  answeredContainerStyle: {
    backgroundColor: 'rgba(255,255,255, 0.05)',
    borderRadius: scaledSize(8),
    marginVertical: scaledSize(16),
    padding: scaledSize(16),
  },
  supportTitleStyle: {
    textTransform: 'uppercase',
    color: '$primaryMain',
  },
  answeredStyle: {
    marginVertical: scaledSize(8),
  },
  imageStyle: {
    width: scaledSize(250),
    height: scaledSize(250),
    marginTop: scaledSize(16),
    alignSelf: 'center',
  },
});

export default styles;
