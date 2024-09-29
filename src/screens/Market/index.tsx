import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import EmptyList from '@components/containers/EmptyList';
import HeaderCurrencies, {
  IMarketFilters,
} from '@components/headers/HeaderCurrencies';
import ItemPair, {Header} from './ItemPair';
import RefreshLoader from '@components/other/RefreshLoader';

import styles from './styles';

import {stylesGlobal} from '@constants/globalStyles';
import {customSearch} from '@utils/index';

import {
  selectCurrencies,
  selectLoading,
  selectPairs,
} from '@store/tradeview/selectors';
import {
  getPairs,
  ISocketPair,
  onUpdatePairs,
  setPairCode,
} from '@store/tradeview';
import useTConstants from '@hooks/useTConstants';
import {selectIsAuth} from '@store/auth';
import Sockets from '@utils/sockets';
import useAppState from '@hooks/useAppState';

export default function Market({navigation}: StackScreenProps<any>) {
  const {FILTER_TYPES} = useTConstants();
  const appStateVisible = useAppState();
  const [isFocused, setFocused] = useState(false);
  const [filters, setFilters] = useState({
    currencyCode: '',
    currencyType: FILTER_TYPES[0],
    query: '',
  } as IMarketFilters);
  const [filteredPairs, setFilteredPairs] = useState(
    undefined as undefined | any[],
  );
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const pairs = useSelector(selectPairs);
  const currencies = useSelector(selectCurrencies);
  const loading = useSelector(selectLoading);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('prices');
        Sockets.listen<ISocketPair>('prices', ({data}) => {
          dispatch(onUpdatePairs(data));
        });
      }

      return () => {
        Sockets.unsubscribes('prices');
        Sockets.listenOff('prices');
      };
    }, [loading, appStateVisible]),
  );

  const onChangeFilters = useCallback(
    (key: keyof IMarketFilters) => (value: any) => {
      if (filters[key] === value && key === 'currencyCode') {
        setFilters({
          ...filters,
          [key]: '',
        });
        return;
      }
      setFilters({
        ...filters,
        [key]: value,
      });
    },
    [filters],
  );

  const onRefresh = useCallback(() => {
    dispatch(getPairs());
  }, [dispatch]);

  useEffect(() => {
    const {query, currencyCode, currencyType} = filters;

    if (query || currencyCode || currencyType.value !== 'all') {
      const fPairs = pairs
        .filter(p => customSearch(p.title, query))
        .filter(p =>
          currencyCode
            ? p.base_currency.code === currencyCode ||
              p.main_currency.code === currencyCode
            : true,
        )
        .filter(p =>
          currencyType.value !== 'all'
            ? (currencyType.value === 'fiat' && p.base_currency.is_fiat) ||
              (currencyType.value === 'crypto' && !p.base_currency.is_fiat)
            : true,
        );

      setFilteredPairs(fPairs);
    } else {
      setFilteredPairs(undefined);
    }
  }, [filters, pairs]);

  useEffect(() => {
    dispatch(getPairs());
  }, [appStateVisible]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setFocused(true);
      onRefresh();
    });

    const blurListener = navigation.addListener('blur', () => {
      setFocused(false);
    });

    return () => {
      focusListener?.();
      blurListener?.();
      // navigation.removeListener('focus', focusListener);
      // navigation.removeListener('blur', blurListener);
    };
  }, [navigation, onRefresh]);

  const renderPair = ({item}: {item: any}) => {
    const onPress = () => {
      if (isAuth) {
        dispatch(setPairCode(item.pair));
        navigation.navigate('TradeViewStack');
      } else {
        navigation.navigate('Auth');
      }
    };
    return <ItemPair {...item} onPress={onPress} />;
  };

  return (
    <SafeContainer loading={!isFocused} containerStyle={styles.containerStyle}>
      <HeaderCurrencies
        {...filters}
        currencies={currencies}
        onChangeFilters={onChangeFilters}
      />

      <FlatList
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        data={filteredPairs || pairs}
        renderItem={renderPair}
        keyExtractor={item => item.pair_id.toString()}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={stylesGlobal.contentContainerStyle}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListHeaderComponent={Header}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeContainer>
  );
}
