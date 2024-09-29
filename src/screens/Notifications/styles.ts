import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  notificationBodyStyle: {
    flex: 1,
  },
  notificationsContainerStyle: {
    flexGrow: 1,
  },
  timeStyle: {
    color: '$white50',
  },
  messageStyle: {
    color: '$white75',
    marginTop: 8,
  },
  readContainerStyle: {
    backgroundColor: '$primaryMain',
    width: scaledSize(4),
    height: scaledSize(4),
    borderRadius: scaledSize(2),
    marginRight: scaledSize(10),
  },
  readNotificationContainerStyle: {
    backgroundColor: '$white5',
  },
  iconContainerStyle: {
    width: scaledSize(16),
    height: scaledSize(16),
    borderRadius: scaledSize(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledSize(10),
  },
  readTitleStyle: {
    color: '$primaryMain',
    marginRight: 8,
  },
  deleteTitleStyle: {
    color: '$red',
    marginLeft: 8,
  },

  notificationContainerStyle: {
    flex: 1,
  },

  headerRightContainer: {
    marginRight: scaledSize(16),
  },
});

export default styles;
