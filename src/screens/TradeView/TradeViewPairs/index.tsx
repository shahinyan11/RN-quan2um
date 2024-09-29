import React, {useState, useEffect, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ItemPair from '@components/items/ItemPair';
import Divider from '@components/Divider';
import InputSearch from '@components/inputs/InputSearch';
import RefreshLoader from '@components/other/RefreshLoader';
import FilterCurrency from '@components/other/FilterCurrency';

import styles from './styles';

import {
  getTradeViewPairs,
  ITVPair,
  onUpdateTVPair,
  selectLoading,
  selectTVPairs,
  setPairCode,
} from '@store/tradeview';
import {customSearch} from '@utils/index';
import Sockets from '@utils/sockets';
import {useFocusEffect} from '@react-navigation/native';
import useAppState from '@hooks/useAppState';

const CustomDivider = () => <Divider containerStyle={styles.dividerStyle} />;

export default function TradeViewPairs({navigation}: StackScreenProps<any>) {
  const loading = useSelector(selectLoading);
  const tradeView = useSelector(selectTVPairs);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const appStateVisible = useAppState();

  const [filters, setFilters] = useState([] as any[]);

  const [query, setQuery] = useState('');
  const [filteredPairs, setFilteredPairs] = useState(
    undefined as ITVPair[] | undefined,
  );

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('prices');
        Sockets.listen('prices', ({data}: any) => {
          dispatch(onUpdateTVPair(data));
        });
      }

      return () => {
        Sockets.unsubscribes('prices');
        Sockets.listenOff('prices');
      };
    }, [appStateVisible]),
  );

  const onRefresh = () => {
    dispatch(getTradeViewPairs());
  };

  const renderTVItem = ({item}: {item: ITVPair}) => {
    const onPressTVItem = () => {
      try {
        dispatch(setPairCode(item.pair));

        navigation.goBack();
      } catch (e) {
        console.log('Error getting pair');
      }
    };
    return (
      <ItemPair
        {...item.logo.png}
        name={item.pair_format}
        change={item.change}
        onPress={onPressTVItem}
      />
    );
  };

  useEffect(() => {
    const currencies = new Set();

    tradeView.forEach(item => {
      const title = item.pair.split('_');

      currencies.add(title[0]);
      currencies.add(title[1]);
    });

    setFilters(Array.from(currencies));
  }, [tradeView]);

  useEffect(() => {
    if (query) {
      const fPairs = tradeView.filter(pair =>
        customSearch(pair.pair_format, query),
      );

      setFilteredPairs(fPairs);
    } else {
      setFilteredPairs(undefined);
    }
  }, [tradeView, query]);

  return (
    <SafeContainer>
      <FilterCurrency
        selectedFilter={query}
        filters={filters}
        onPress={setQuery}
      />
      <InputSearch
        placeholder={t('common.search')}
        containerStyle={styles.inputSearchContainerStyle}
        value={query}
        onChangeText={setQuery}
      />
      <Text type="t6" style={styles.titleStyle}>
        {t('common.m_search_results')}
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
        data={filteredPairs || tradeView}
        renderItem={renderTVItem}
        ItemSeparatorComponent={CustomDivider}
        keyExtractor={item => item.id.toString()}
      />
    </SafeContainer>
  );
}
