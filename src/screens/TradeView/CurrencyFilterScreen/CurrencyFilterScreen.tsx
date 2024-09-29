import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import Divider from '@components/Divider';
import InputSearch from '@components/inputs/InputSearch';

import styles from './styles';

import {selectFilterParams} from '@store/tradeview';
import {customSearch} from '@utils/index';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import EStyleSheet from 'react-native-extended-stylesheet';
import ItemCurrency from './ItemCurrency';

const CustomDivider = () => <Divider containerStyle={styles.dividerStyle} />;

/**
 * Currency filter screen with search input
 * @param navigation
 * @param route
 */
function CurrencyFilterScreen({navigation, route}: any) {
  const iconColor = EStyleSheet.value('$white50');
  const filterParams = useSelector(selectFilterParams);

  const {t} = useTranslation();
  const {callBackAction} = route.params;

  const [query, setQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);

  const renderItem = ({item}: any) => {
    const onPressItem = (currency: any) => {
      callBackAction(currency, 'main_currency');
      navigation.goBack();
    };
    return <ItemCurrency item={item} onPress={onPressItem} />;
  };

  useEffect(() => {
    if (query) {
      const filtered = filterParams.currencies.filter(item =>
        customSearch(item.name, query),
      );

      setFilteredCurrencies(filtered);
    } else {
      setFilteredCurrencies(null);
    }
  }, [filterParams.currencies, query]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeContainer>
      <Row
        justifyContent="space-between"
        containerStyle={styles.containerHeader}>
        <Icon
          name="arrow-left"
          onPress={goBack}
          disabled={false}
          size={20}
          color={iconColor}
          containerStyle={styles.iconContainer}
        />
        <InputSearch
          placeholder={t('common.search')}
          containerStyle={styles.inputSearchContainerStyle}
          value={query}
          onChangeText={setQuery}
        />
      </Row>
      <Text type="t6" style={styles.titleStyle}>
        {t('common.m_search_results')}
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredCurrencies || filterParams.currencies}
        renderItem={renderItem}
        ItemSeparatorComponent={CustomDivider}
        keyExtractor={item => item.name}
      />
    </SafeContainer>
  );
}

export default CurrencyFilterScreen;
