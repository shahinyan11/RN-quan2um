import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';

import ItemCrypto from '@components/items/ItemCrypto';
import Row from '@components/containers/Row';
import CheckBox from '@components/checkboxes/CheckBox';
import Picker from '@components/pickers/Picker';

import {Currency} from '@store/account/types';

import styles from './styles';
import {IFilterType} from '@constants/index';
import useTConstants from '@hooks/useTConstants';

interface IWalletListProps {
  data: Currency[] | undefined;
  isSecure: boolean;
}

const WalletsList = ({data, isSecure}: IWalletListProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {FILTER_TYPES} = useTConstants();

  const [isHideRestVisible, setHideRestVisible] = useState(false);
  const [filter, setFilter] = useState(FILTER_TYPES[0]);
  const [filteredData, setFilteredData] = useState(
    undefined as Currency[] | undefined,
  );

  useEffect(() => {
    let result;
    switch (filter.value) {
      case 'fiat': {
        result = data?.filter(
          ({is_fiat, balance}) =>
            (is_fiat && isHideRestVisible && balance > 0) ||
            (is_fiat && !isHideRestVisible),
        );
        break;
      }
      case 'crypto': {
        result = data?.filter(
          ({is_fiat, balance}) =>
            (!is_fiat && isHideRestVisible && balance > 0) ||
            (!is_fiat && !isHideRestVisible),
        );
        break;
      }
      default: {
        result = data?.filter(
          ({balance}) =>
            (isHideRestVisible && balance > 0) || !isHideRestVisible,
        );
        break;
      }
    }

    setFilteredData(result);
  }, [filter, isHideRestVisible, data]);

  const onChangeRestVisible = () => setHideRestVisible(!isHideRestVisible);

  const onPressItem = (item: Currency) => {
    navigation.navigate('WalletCurrency', {
      currencyId: item.id,
      pairCode: item.pair_code,
    });
  };

  const list = useMemo(() => filteredData || data, [filteredData, data]);

  return (
    <>
      <Row
        justifyContent="space-between"
        containerStyle={styles.filtersContainerStyle}>
        <CheckBox
          isActive={isHideRestVisible}
          title={t('common.hide')}
          onPress={onChangeRestVisible}
          checkboxContainerStyle={styles.checkboxContainerStyle}
          containerStyle={styles.checkBoxContainer}
        />
        <Picker<IFilterType<any>>
          value={filter}
          list={FILTER_TYPES}
          onPress={setFilter}
          keyField={'id'}
          labelField={'title'}
        />
      </Row>
      {list?.map(item => (
        <ItemCrypto
          id={item.id}
          title={item.slug}
          subtitle={item.name}
          balance={isSecure ? '****' : item.balance_face}
          balanceFiat={isSecure ? '****' : item.balance_fiat_face}
          icon={item.logo_png}
          colors={[
            item.color_hex || 'transparent',
            item.color_hex2 || 'transparent',
          ]}
          onPressItem={() => onPressItem(item)}
        />
      ))}
    </>
  );
};

export default WalletsList;
