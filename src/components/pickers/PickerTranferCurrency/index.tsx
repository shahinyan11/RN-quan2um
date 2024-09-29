import React, {useCallback, useState, useEffect} from 'react';
import {Modal, FlatList, View} from 'react-native';

import {useTranslation} from 'react-i18next';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';
import SafeContainer from '@components/containers/SafeContainer';
import ItemCurrency from '@components/items/ItemCurrency';
import {HeaderWithSearch} from '@components/other/Header';
import ImageGradient from '@components/icons/ImageGradient';
import EmptyList from '@components/containers/EmptyList';
import Divider from '@components/Divider';
import RefreshLoader from '@components/other/RefreshLoader';

import {TransferCurrency} from '@store/account/types';

import {stylesGlobal} from '@constants/globalStyles';
import styles from './styles';
import {customSearch, scaledSize} from '@utils/index';

interface PickerTransferCurrency {
  value: undefined | TransferCurrency;
  data: TransferCurrency[];
  onPress: (value: TransferCurrency) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const PickerTransferCurrency = ({
  value,
  data,
  onPress,
  onRefresh,
  refreshing,
}: PickerTransferCurrency) => {
  const [isCurrenciesVisible, setCurrenciesVisible] = React.useState(false);
  const [query, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(
    undefined as undefined | TransferCurrency[],
  );
  const {t} = useTranslation();

  const onChangeModalVisible = useCallback(
    () => setCurrenciesVisible(!isCurrenciesVisible),
    [isCurrenciesVisible],
  );

  useEffect(() => {
    setFilteredData(
      data.filter(
        item =>
          customSearch(item.currency.name, query) ||
          customSearch(item.currency.code, query),
      ),
    );
  }, [query, data]);

  const renderCurrencyItem = ({item}: {item: TransferCurrency}) => {
    const handlePressItem = () => {
      onPress(item);
      onChangeModalVisible();
    };

    return (
      <ItemCurrency
        {...item.currency}
        onPress={handlePressItem}
        isSelected={value?.id === item.id}
      />
    );
  };

  return (
    <>
      <ContainerItem disabled={false} onPress={onChangeModalVisible}>
        <Row justifyContent="space-between">
          {value ? (
            <Row>
              <ImageGradient
                iconSize={scaledSize(15)}
                url={value.currency.logo_png}
                colors={[
                  value.currency.color_hex || 'transparent',
                  value.currency.color_hex2 || 'transparent',
                ]}
                iconContainerStyle={styles.iconContainerStyle}
              />

              <Text type="btnRegular" style={styles.titleStyle}>
                {value.currency.slug}
              </Text>
              <Text style={styles.subtitleStyle}>{value.currency.name}</Text>
            </Row>
          ) : (
            <Text type="description">{t('common.m_select_currency')}</Text>
          )}
          <Icon name="arrow-right" size={20} />
        </Row>
      </ContainerItem>

      {isCurrenciesVisible && (
        <Modal visible={isCurrenciesVisible}>
          <SafeContainer containerStyle={stylesGlobal.screenContainerStyle}>
            <HeaderWithSearch
              onBack={onChangeModalVisible}
              onSearch={setSearchQuery}
            />
            <View style={stylesGlobal.fullScale}>
              <FlatList
                refreshing={refreshing}
                refreshControl={
                  <RefreshLoader
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                showsVerticalScrollIndicator={false}
                data={filteredData || data}
                renderItem={renderCurrencyItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={EmptyList}
                contentContainerStyle={stylesGlobal.contentContainerStyle}
                ItemSeparatorComponent={Divider}
              />
            </View>
          </SafeContainer>
        </Modal>
      )}
    </>
  );
};

export default React.memo(PickerTransferCurrency);
