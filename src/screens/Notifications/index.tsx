import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {FlatList, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import Link from '@components/textes/Link';
import RoundCheckBox from '@components/checkboxes/RoundCheckBox';
import RefreshLoader from '@components/other/RefreshLoader';
import EmptyList from '@components/containers/EmptyList';

import {
  getNotifications,
  onNotificationsDelete,
  onNotificationsRead,
} from '@store/account';
import {Notification} from '@store/account/types';
import {selectLoading, selectNotifications} from '@store/account/selectors';
import ItemNotification from './ItemNotification';

import styles from './styles';

/**
 * Screen Notifications
 * @param navigation
 */
function Notifications({navigation}: StackScreenProps<any>) {
  const primaryColor = EStyleSheet.value('$primaryMain');
  const successColor = EStyleSheet.value('$green');
  const errorColor = EStyleSheet.value('$red');
  const alertColor = EStyleSheet.value('$yellow');
  const disabledColor = EStyleSheet.value('$white25');

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectLoading);

  const [isEditMode, setEditMode] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState(
    [] as number[],
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          {isEditMode ? (
            <Link title={t('common.m_done')} onPress={onSetEditMode} />
          ) : (
            <Icon disabled={false} name="pencil" onPress={onSetEditMode} />
          )}
        </View>
      ),
    });
  }, [navigation, isEditMode]);

  const onSelectNotification = useCallback(
    (id: number, isSelected: boolean) => {
      if (isSelected) {
        setSelectedNotifications(
          selectedNotifications.filter(item => item !== id),
        );
      } else {
        setSelectedNotifications(selectedNotifications.concat(id));
      }
    },
    [setSelectedNotifications, selectedNotifications],
  );

  const onSetEditMode = useCallback(() => {
    if (isEditMode) {
      setSelectedNotifications([]);
      setSelectAll(false);
    }
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const onSelectAll = () => {
    if (isSelectAll) {
      setSelectedNotifications([]);
    }
    setSelectAll(!isSelectAll);
  };

  const onRead = () => {
    dispatch(
      onNotificationsRead({
        ids: selectedNotifications,
        read_all: isSelectAll ? 1 : 0,
      }),
    );
  };

  const onDelete = () => {
    dispatch(
      onNotificationsDelete({
        ids: selectedNotifications,
        delete_all: isSelectAll ? 1 : 0,
      }),
    );
  };

  const onLoadMore = () => {
    dispatch(getNotifications({}, true));
  };

  const onRefresh = () => {
    dispatch(getNotifications());
  };

  const renderItemNotification = ({item}: {item: Notification}) => {
    const colors = {
      success: successColor,
      error: errorColor,
      info: alertColor,
    };

    const backgroundColor = () => {
      if (item.is_read) {
        return disabledColor;
      }

      return colors[item.kind];
    };
    const isSelected = selectedNotifications.includes(item.id);

    const onPress = () => {
      setSelectAll(false);
      onSelectNotification(item.id, isSelected);
    };

    return (
      <ItemNotification
        {...item}
        selectedColor={primaryColor}
        isSelected={isSelected || isSelectAll}
        disabled={!isEditMode}
        backgroundColor={backgroundColor()}
        onPress={onPress}
      />
    );
  };

  return (
    <SafeContainer>
      {isEditMode && (
        <Row justifyContent="space-between">
          <RoundCheckBox
            selectedColor={primaryColor}
            isSelected={isSelectAll}
            onPress={onSelectAll}
            title={t('common.m_select_all')}
          />

          <Row>
            <Link
              title={t('common.m_read')}
              linkStyle={styles.readTitleStyle}
              onPress={onRead}
            />
            <Link
              title={t('common.m_delete')}
              linkStyle={styles.deleteTitleStyle}
              onPress={onDelete}
            />
          </Row>
        </Row>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={renderItemNotification}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.notificationsContainerStyle}
        ListEmptyComponent={EmptyList}
      />
    </SafeContainer>
  );
}

export default Notifications;
