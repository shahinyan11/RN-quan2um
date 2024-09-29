import React, {useEffect, useMemo, useState} from 'react';
import Text from '@components/textes/Text';
import {styles} from './styles';
import {Linking, View} from 'react-native';
import ButtonGradient from '@components/buttons/ButtonGradient';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory, getMasterNodes} from '@store/ecomining/action';
import {
  selectLoading,
  selectMasterNodeData,
  selectMasterNodeHistory,
} from '@store/ecomining';
import {StackScreenProps} from '@react-navigation/stack';
import {setPairCode} from '@store/tradeview';
import {Trans, useTranslation} from 'react-i18next';
import ButtonGradientBorder from '@components/buttons/ButtonGradientBorder';
import InfoBox from '@screens/Ecomining/InfoBox';
import InvestmentCard from '@screens/Ecomining/InvestmentCard';
import TransactionsTab from '@screens/Ecomining/TransactionsTab';
import TransactionCard from './TransactionCard';
import Button from '@components/buttons/Button';
import {MASTER_NODE_HISTORY_TAB} from '@constants/index';
import Loader from '@components/other/Loader';
import {showModal} from '@store/modal';

function Ecomining({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const {current_node, node_investments, currency} =
    useSelector(selectMasterNodeData);
  const masterNodeHistory = useSelector(selectMasterNodeHistory);
  const [activeTab, setActiveTab] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getMasterNodes());
  }, []);

  useEffect(() => {
    if (current_node?.id) {
      dispatch(
        getHistory({
          kind: activeTab,
          page: 1,
        }),
      );
    }
  }, [current_node, activeTab]);

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const topUpAccount = () => {
    dispatch(setPairCode('BTCA_BTC'));
    navigation.navigate('TradeView', {screen: 'TradeView'});
  };

  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isEndReached =
      contentSize.height - (layoutMeasurement.height + contentOffset.y) < 50;
    if (isEndReached && showAll) {
      dispatch(
        getHistory(
          {
            master_node_id: current_node?.id,
            kind: activeTab,
          },
          true,
        ),
      );
    }
  };

  const transactions = useMemo(() => {
    return showAll
      ? masterNodeHistory.data
      : [...masterNodeHistory.data].splice(0, 3);
  }, [masterNodeHistory.data, showAll]);

  const handleStartMining = () => {
    dispatch(showModal({modalType: 'START_MINING'}));
  };

  const sortedInvestments = useMemo(() => {
    return [...node_investments].sort((a, b) => {
      if (!a.isBonus && b.isBonus) {
        return 1;
      } else if (a.isBonus === b.isBonus) {
        return 0;
      } else {
        return -1;
      }
    });
  }, [node_investments]);

  return (
    <SafeScrollContainer
      containerStyle={styles.containerStyle}
      onScroll={handleScroll}>
      <View>
        <Text style={styles.darkText}>{t('invest_mn.static_string_one')}</Text>
        <Text style={styles.darkText}>{t('invest_mn.static_string_two')}</Text>
        <Text style={styles.darkText}>
          <Trans
            i18nKey={'invest_mn.static_string_three'}
            components={{
              span: (
                <Text
                  style={{color: '#0DAAFF', textDecorationLine: 'underline'}}
                  onPress={() =>
                    Linking.openURL(t('info_referral.url_referral_programs'))
                  }
                />
              ),
            }}
          />
        </Text>

        <InfoBox containerStyle={{marginTop: 40}} />

        <View style={{marginTop: 10, marginBottom: 40}}>
          <ButtonGradientBorder
            text={t('common.buy_btca')}
            onPress={topUpAccount}
          />
          <ButtonGradient
            gradientColors={['#00FF75', '#0075FF']}
            title={t('invest_mn.start_mining')}
            containerStyle={styles.buttonContainer}
            onPress={handleStartMining}
          />
        </View>

        {sortedInvestments?.length !== 0 && (
          <View>
            <Text type="t3" style={{marginBottom: 30}}>
              {t('common.master_nodes')}
            </Text>

            {sortedInvestments.map((item: any, index: any) => (
              <InvestmentCard
                key={index}
                currencyCode={currency.code}
                {...item}
              />
            ))}
          </View>
        )}

        {transactions.length !== 0 && (
          <View style={{marginTop: 30}}>
            <Text type="t3" style={{marginBottom: 20}}>
              {t('invest_mn.last_transaction')}
            </Text>
            <TransactionsTab onChange={handleTabChange} />

            <Text type="t3" style={{marginTop: 30, marginBottom: 20}}>
              {MASTER_NODE_HISTORY_TAB[activeTab]}
            </Text>

            {transactions.map(value => (
              <TransactionCard item={value} />
            ))}

            {loading && <Loader />}

            {!showAll && (
              <Button
                title={t('common.show_all')}
                onPress={() => setShowAll(true)}
                buttonContainerStyle={styles.showAllListBtn}
              />
            )}
          </View>
        )}
      </View>
    </SafeScrollContainer>
  );
}

export default Ecomining;
