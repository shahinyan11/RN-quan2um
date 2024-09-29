import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import ModalCurrencies from '@components/modals/ModalCurrencies';
import Icon from '@components/icons/Icon';
import ImageGradient from '@components/icons/ImageGradient';

import useFetch from '@hooks/useFetch';
import {ACCOUNT_DEPOSIT_WALLETS, ACCOUNT_WITHDRAW_WALLETS} from '@api';

import styles from './styles';
import {scaledSize} from '@utils/scaledSize';

interface PickerCurrencyProps {
  type?: 'putIn' | 'putOut';
  value: any;
  onPress: (item: any) => void;
  initCurrencyId?: number;
}

const PickerCurrency = ({
  value,
  onPress,
  type = 'putIn',
  initCurrencyId,
}: PickerCurrencyProps) => {
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  const onChangeModalVisible = () => setModalVisible(!isModalVisible);

  const {response = []} = useFetch({
    url: type === 'putIn' ? ACCOUNT_DEPOSIT_WALLETS : ACCOUNT_WITHDRAW_WALLETS,
  });

  const currencyFilter = useCallback(
    (currency: any) =>
      (currency.can_deposit && type === 'putIn') ||
      (type === 'putOut' && currency.can_withdrawal),
    [type],
  );

  useEffect(() => {
    try {
      if (response.length) {
        let item = response.find(currencyFilter);

        if (initCurrencyId) {
          const initItem = response
            .filter(currencyFilter)
            .find(currency => currency.id === initCurrencyId);
          if (initItem) {
            item = initItem;
          }
        }

        onPress(item);
      }
    } catch (e) {
      console.log('Error settings of default value in picker');
    }
  }, [response, onPress, currencyFilter, initCurrencyId]);

  return (
    <>
      <ContainerItem disabled={false} onPress={onChangeModalVisible}>
        <Row justifyContent="space-between">
          {value ? (
            <Row>
              <ImageGradient
                iconSize={scaledSize(15)}
                url={value.logo_png}
                colors={[
                  value.color_hex || 'transparent',
                  value.color_hex2 || 'transparent',
                ]}
                iconContainerStyle={styles.iconContainerStyle}
              />

              <Text type="btnRegular" style={styles.titleStyle}>
                {value.slug}
              </Text>
              <Text style={styles.subtitleStyle}>{value.name}</Text>
            </Row>
          ) : (
            <Text type="description">{t('common.m_select_currency')}</Text>
          )}
          <Icon name="arrow-right" size={16} />
        </Row>
      </ContainerItem>

      <ModalCurrencies
        visible={isModalVisible}
        value={value}
        onPress={onPress}
        data={response.filter(currencyFilter)}
        onClose={onChangeModalVisible}
      />
    </>
  );
};

export default React.memo(PickerCurrency);
