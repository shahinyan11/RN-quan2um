import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import TransactionCardExchange from '@components/TransactionCardExchange';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import * as SVG from '@assets/svgs';
import st from './styles';
import {EXCHANGE_TABS} from '@constants/tabs';
import {getTransactionsList} from '@store/exchange';
import Tab from '@components/Tab';
// import {getDepositList} from '@store/exchange';

export default function ExchangeTransactionScreen({navigation}: any) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(EXCHANGE_TABS.DEPOSIT.id);
  const {transactions} = useSelector(state => state.exchange);

  useEffect(() => {
    dispatch(getTransactionsList({tab}));
  }, [tab]);

  const handleTabChange = useCallback((tabId: number) => setTab(tabId), []);

  return (
    <SafeContainer>
      <Tab
        onChange={handleTabChange}
        tabs={Object.values(EXCHANGE_TABS)}
        containerStyle={st.tab}
      />
      <View style={st.row}>
        <Text style={st.text}>
          {tab === EXCHANGE_TABS.DEPOSIT.id
            ? t('assets.history_deposit')
            : t('assets.history_withdraw')}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: 'TransactionFilter',
              params: {tab, filters: ['currency', 'status', 'info']},
            })
          }>
          <SVG.Filter />
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TransactionCardExchange item={item} />}
      />
    </SafeContainer>
  );
}
