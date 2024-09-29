import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import InputSearch from '@components/inputs/InputSearch';
import Row from '@components/containers/Row';
import Picker from '@components/pickers/Picker';

import {IFilterCash} from '@constants/index';

import useTConstants from '@hooks/useTConstants';

import styles from './styles';
import {Currency} from '@store/tradeview/types';

export interface IMarketFilters {
  currencyCode: string;
  currencyType: IFilterCash;
  query: string;
}

export interface IHeaderCurrencies extends IMarketFilters {
  currencies: Currency[];
  onChangeFilters: (key: keyof IMarketFilters) => (value: any) => void;
}

const HeaderCurrencies = ({
  currencies,
  currencyCode,
  currencyType,
  query,
  onChangeFilters,
}: IHeaderCurrencies) => {
  const {t} = useTranslation();
  const {FILTER_TYPES} = useTConstants();
  return (
    <>
      <InputSearch
        autoFocus={false}
        placeholder={t('common.search')}
        value={query}
        onChangeText={onChangeFilters('query')}
      />
      <Row
        justifyContent="space-between"
        containerStyle={styles.headerContainerStyle}>
        <Text type="t4">{t('home.m_list_of_couples')}</Text>

        <Picker
          value={currencyType}
          list={FILTER_TYPES}
          keyField={'value'}
          labelField={'title'}
          onPress={onChangeFilters('currencyType')}
        />
      </Row>
      <View style={{marginBottom: 20}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {currencies.map((item, index) => {
            const isSelected = item.code === currencyCode;
            const onPress = () => {
              onChangeFilters('currencyCode')(item.code);
            };

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabContainerStyle,
                  isSelected && styles.tabActiveContainerStyle,
                ]}
                onPress={onPress}>
                <Text type="btnMini" style={styles.tabTitleStyle}>
                  {item.code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default React.memo(HeaderCurrencies);
