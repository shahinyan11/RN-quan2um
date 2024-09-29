import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Row from '@components/containers/Row';
import RoundCheckBox from '@components/checkboxes/RoundCheckBox';
import ContainerItem from '@components/containers/ContainerItem';
import styles from '@screens/Notifications/styles';
import {stylesGlobal} from '@constants/globalStyles';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';
import {formatDate} from '@utils/fns';
import {Notification} from '@store/account/types';

interface ItemNotificationProps extends Notification {
  backgroundColor: string;
  onPress: () => void;
  disabled: boolean;
  isSelected: boolean;
  selectedColor: string;
}

const ItemNotification = ({
  title,
  is_read,
  backgroundColor,
  time,
  message,
  disabled,
  isSelected,
  selectedColor,
  onPress,
}: ItemNotificationProps) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <Row>
      {!disabled && (
        <RoundCheckBox
          isSelected={isSelected}
          disabled={true}
          selectedColor={selectedColor}
        />
      )}
      <ContainerItem
        containerStyle={[
          styles.notificationContainerStyle,
          is_read && styles.readNotificationContainerStyle,
        ]}>
        <Row justifyContent="space-between">
          <Row containerStyle={stylesGlobal.flexOne}>
            {!is_read && <View style={styles.readContainerStyle} />}
            <Icon
              name={'error'}
              size={8}
              containerStyle={[styles.iconContainerStyle, {backgroundColor}]}
            />
            <Text type="t6" numberOfLines={1} style={stylesGlobal.flexOne}>
              {title}
            </Text>
          </Row>

          <Text type="textSmall" style={styles.timeStyle}>
            {formatDate(time, 'yyyy/MM/dd')}
          </Text>
        </Row>
        <Text type="textSmall" style={styles.messageStyle}>
          {message}
        </Text>
      </ContainerItem>
    </Row>
  </TouchableOpacity>
);

export default memo(ItemNotification);
