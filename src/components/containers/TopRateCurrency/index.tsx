import React from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import ItemCurrencyGraph from '@components/items/ItemCurrencyGraph';
import EmptyList from '../EmptyList';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {setPairCode} from '@store/tradeview';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsAuth} from '@store/auth';

const TopRateCurrency = ({data}: {data?: any[]}) => {
  const {t} = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderTopCurrency = ({item}: any) => {
    const navigate = () => {
      if (isAuth) {
        dispatch(setPairCode(item.pair));
        navigation.navigate('TradeView', {screen: 'TradeView'});
      } else {
        navigation.navigate('Auth');
      }
    };

    return <ItemCurrencyGraph {...item} onPress={navigate} />;
  };

  return (
    <>
      <Text type="t4">{t('home.m_top_currencies')}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={renderTopCurrency}
        style={styles.flStyle}
        keyExtractor={item => item.pair_id.toString()}
        ListEmptyComponent={EmptyList}
      />
    </>
  );
};

export default TopRateCurrency;
