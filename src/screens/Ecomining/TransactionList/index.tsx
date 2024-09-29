import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Text from '@components/textes/Text';
import useAppState from '@hooks/useAppState';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  getHistory,
  getMasterNodes,
  selectMasterNodeData,
  selectMasterNodeHistory,
} from '@store/ecomining';

import React, {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EcominingBottomModal from '../EcoModal';
import RenderTransactionList from './RenderTransactionList';
import styles from './style';

import moment from 'moment';
//import 'moment/locale/ru';
import {useTranslation} from 'react-i18next';
import {MONTHS} from '@utils/fns';
//moment.locale('ru-RU');

function TransactionList({navigation, route}: StackScreenProps<any>) {
  const [lastMonthTransactions, setLastMonthTransactions] = useState('');
  const [loading, setLoading] = useState(true);
  const masterNodeData = useSelector(selectMasterNodeData);
  const masterNodeHistoryData = useSelector(selectMasterNodeHistory);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const appStateVisible = useAppState();
  const [modalDatePicker, setModalDatePicker] = useState(false);
  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        dispatch(getMasterNodes());
      }
      return () => {};
    }, [appStateVisible, dispatch]),
  );

  useEffect(() => {
    if (masterNodeData !== undefined) {
      const _lastTransactions = masterNodeData?.last_transactions;

      dispatch(
        getHistory({
          page: 1,
          master_node_id: masterNodeData.current_node.id,
          kind: 1,
          time_start: _lastTransactions[_lastTransactions.length - 1].time,
          time_end: _lastTransactions[0].time,
        }),
      );
      const _masterNodeHistoryData = masterNodeHistoryData?.data;
      if (_masterNodeHistoryData !== undefined) {
        const date = new Date(_masterNodeHistoryData[0]?.time * 1000);

        if (!isNaN(date)) {
          //moment.locale('ru-RU');
          const lastMonth = date.getMonth(); //.toLocaleString('en', {month: 'short'});
          // Platform.OS === 'ios'
          //   ? date.toLocaleString('ru-RU', {month: 'long'})
          //   : moment(date).format('MMMM');

          setLastMonthTransactions(MONTHS[lastMonth]);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }

    return () => {};
  }, [dispatch, masterNodeData, masterNodeHistoryData, loading]);

  const resetModalState = () => {
    setModalVisible(false);
    setModalDatePicker(false);
  };
  return (
    <SafeScrollContainer
      loading={loading}
      containerStyle={styles.safeScrollContainerStyle}>
      <Text type="t4" style={styles.nodeTitle}>
        {t('common.history_mn')}{' '}
        <Text
          type="t4"
          style={styles.showAllListBtn}
          onPress={() => {
            setModalVisible(true);
            setModalDatePicker(true);
          }}>
          {/* {lastMonthTransactions} */}
          {t(`month.${lastMonthTransactions}`)}
        </Text>
      </Text>

      <RenderTransactionList mappingData={masterNodeHistoryData?.data} />

      <EcominingBottomModal
        isVisible={modalVisible}
        datePicker={modalDatePicker}
        resetModalStateCallback={resetModalState}
        masterNodeDataHistory={masterNodeHistoryData?.data}
      />
    </SafeScrollContainer>
  );
}

export default TransactionList;
