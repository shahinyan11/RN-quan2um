import React from 'react';
import {FlatList, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import ContainerItem from '@components/containers/ContainerItem';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import EmptyList from '@components/containers/EmptyList';
import RefreshLoader from '@components/other/RefreshLoader';

import {formatDate} from '@utils/fns';
import useFetch from '@hooks/useFetch';

import {IDevice} from '@store/account/types';

import styles from './styles';
import {ACCOUNT_DEVICES} from '@api';
import {stylesGlobal} from '@constants/globalStyles';

const ItemDevice = ({name, is_active, time, ip}: IDevice) => {
  const {t} = useTranslation();
  return (
    <ContainerItem>
      <Row containerStyle={styles.rowContainerStyle}>
        <View
          style={[
            styles.deviceStatusStyle,
            !is_active && styles.deviceOfflineStatusStyle,
          ]}
        />
        <Text type="t6">{name}</Text>
      </Row>
      <Row
        justifyContent="space-between"
        containerStyle={styles.rowContainerStyle}>
        <Text style={styles.labelStyle}>{t('common.ip_address')}:</Text>
        <Text type="textSmall">{ip}</Text>
      </Row>
      <Row
        justifyContent="space-between"
        containerStyle={styles.rowContainerStyle}>
        <Text style={styles.labelStyle}>{t('common.date')}:</Text>
        <Text type="textSmall">{formatDate(time)}</Text>
      </Row>
      <Row
        justifyContent="space-between"
        containerStyle={styles.rowContainerStyle}>
        <Text style={styles.labelStyle}>{t('common.status')}:</Text>
        <Text
          type="textSmall"
          style={
            is_active ? styles.activeTitleStyle : styles.disabledTitleStyle
          }>
          {is_active ? t('common.active') : t('common.not_active')}
        </Text>
      </Row>
    </ContainerItem>
  );
};

export default function Devices() {
  const {
    response: devices = [],
    isLoading,
    refresh,
  } = useFetch({
    url: ACCOUNT_DEVICES,
  });

  const renderDevice = ({item}: {item: IDevice}) => <ItemDevice {...item} />;

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        refreshControl={
          <RefreshLoader refreshing={isLoading} onRefresh={refresh} />
        }
        data={devices}
        renderItem={renderDevice}
        keyExtractor={item => item.time.toString()}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={stylesGlobal.contentContainerStyle}
      />
    </SafeContainer>
  );
}
