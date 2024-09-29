import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import CountDown from 'react-native-countdown-component';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import SafeContainer from '@components/containers/SafeContainer';
import CircularProgress from '@components/other/CircularProgress';
import ButtonGradient from '@components/buttons/ButtonGradient';
import TransactionCard from '@components/TransactionCardMN';
import EmptyList from '@components/containers/EmptyList';
import Button from '@components/buttons/Button';
import {showModal} from '@store/modal';
import * as SVG from '@assets/svgs/others';
import {CheckMark} from '@assets/svgs/others';
import st from './styles';
import Card from './components/Card';
import {useTranslation} from 'react-i18next';
import {
  getMasterNodesWithReward,
  getMasterNodesWithRewardHistory,
} from '@store/masterNodesX10';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {selectMasterNodes} from '@store/masterNodesX10/selectors';
import {isEmpty} from 'ramda';

export default function MasternodesScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [kind, setKind] = useState(1);
  const [progressPercent, setProgressPercent] = useState(1);
  const [progressValue, setProgressValue] = useState(0);
  const [countdownTime, setCountdownTime] = useState(0);
  const [possibleWithdraw, setPossibleWithdraw] = useState(false);
  const {balance, node_investment, history, coin, node, roi} =
    useSelector(selectMasterNodes);
  const {
    cancelling_at = 0,
    withdrawal_at = 0,
    reward_face,
    fee_face,
    profit_face,
    deposit_face = 0,
    multiple_reward_coefficient,
    deposit_additional,
    can_withdrawal,
  } = node_investment;

  useEffect(() => {
    dispatch(getMasterNodesWithReward());
  }, []);

  useEffect(() => {
    node.id && dispatch(getMasterNodesWithRewardHistory());
  }, [node]);

  useEffect(() => {
    const fullAmount = +deposit_face * +multiple_reward_coefficient;
    const currentAmount = getCurrentAmount();

    const remainsContribute = +(fullAmount - currentAmount).toFixed(7);

    const percent = fullAmount ? (100 * currentAmount) / fullAmount : 100;
    setProgressPercent(percent);

    setProgressValue(remainsContribute || 0);
    setPossibleWithdraw(currentAmount > 0 && currentAmount >= fullAmount);

    calcCountdownTime(withdrawal_at, cancelling_at);
  }, [node_investment]);

  const getCurrentAmount = () => {
    return +(+deposit_face + +deposit_additional).toFixed(7);
  };

  const calcCountdownTime = (withdrawal_at, cancelling_at) => {
    const time = withdrawal_at || cancelling_at;
    const diff = moment(time * 1000).diff(moment()) / 1000;
    setCountdownTime(diff);
  };

  const handleInfoClick = () => {
    dispatch(
      showModal({
        modalType: 'INFO_MASTERNOD',
      }),
    );
  };

  const handleKindChange = (kindNumber: number) => {
    dispatch(getMasterNodesWithRewardHistory(kindNumber));
    setKind(kindNumber);
  };

  const handleInvestClick = () => {
    dispatch(
      showModal({
        modalType: 'INVEST',
      }),
    );
  };

  const handleWithdrawalClick = () => {
    dispatch(
      showModal({
        modalType: 'WITHDRAW_CONFIRM',
      }),
    );
  };

  const onCountdownEnd = () => {
    dispatch(getMasterNodesWithReward());
  };

  const dynamicTexts = useMemo(() => {
    const timer = !possibleWithdraw
      ? 'invest_mn.deposit_will_expire_after'
      : withdrawal_at
      ? 'invest_mn.can_be_withdrawn_after'
      : 'invest_mn.auto_withdrawal_after';

    const description = !possibleWithdraw
      ? 'invest_mn.withdraw_funds_in_this_period'
      : withdrawal_at
      ? 'invest_mn.wait_timer_end_to_withdraw'
      : 'invest_mn.wait_for_the_timer_or_withdraw';

    const button = !possibleWithdraw
      ? t('common.to_refill_deposit')
      : t('common.withdraw_deposit');

    return {
      timer: t(timer),
      description: t(description),
      button: t(button),
    };
  }, [possibleWithdraw, withdrawal_at]);

  const isButtonDisabled =
    isEmpty(node_investment) || (withdrawal_at && !can_withdrawal);

  return (
    <SafeContainer>
      <SafeScrollContainer>
        <View style={st.row}>
          <Text style={st.title}>
            {t('invest_mn.multiply_the_deposit_by_10')}
          </Text>
          <TouchableOpacity onPress={handleInfoClick}>
            <SVG.Info size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={st.cardsContainer}>
          <Card type={'balance'} amount={balance} />
          <Card type={'deposit'} amount={deposit_face * 10} />
          <Card type={'profit'} amount={profit_face} />
          <Card type={'award'} amount={reward_face} />
          <Card type={'commission'} amount={fee_face} />
          <Card type={'masternodes'} amount={coin?.total_master_nodes} />
        </View>
        <View style={st.investContainer}>
          <View style={st.row}>
            <Text style={st.subTitle}>{t('common.attachment')}</Text>
            <Text>
              <Text style={st.text}>{t('common.roi')} </Text>
              <Text style={st.textAccent}>
                {t('common.plus_sign')}
                {` ${roi} `}
                {t('common.percent_sign')}
              </Text>
            </Text>
          </View>
          <View style={st.progressContainer}>
            <CircularProgress
              size={240}
              strokeWidth={20}
              progressPercent={progressPercent || 0}
            />
            {possibleWithdraw && <CheckMark size={68} style={st.checkMark} />}
            {!possibleWithdraw && (
              <View style={st.progressCenter}>
                <Text style={st.progressText}>{progressValue} BTCa</Text>
                <Text style={st.progressTextSmall}>Осталось внести</Text>
              </View>
            )}
          </View>

          <View style={[st.row, st.countDownView]}>
            <Text style={st.countDownLabel}>{dynamicTexts.timer}: </Text>
            {/*@ts-ignore*/}
            <CountDown
              id={`${moment().valueOf()}`}
              until={countdownTime}
              onFinish={onCountdownEnd}
              digitTxtStyle={st.text}
              separatorStyle={st.text}
              digitStyle={st.countdownDigits}
              timeLabelStyle={st.timeLabel}
              showSeparator={true}
            />
          </View>
          <Text style={[st.description, st.smallText]}>
            {dynamicTexts.description}
          </Text>
          <ButtonGradient
            onPress={
              possibleWithdraw ? handleWithdrawalClick : handleInvestClick
            }
            title={dynamicTexts.button}
            buttonContainerStyle={st.gradientButton}
            gradientColors={['#00FF75', '#0075FF']}
            disabledGradientColors={['#00FF75', '#0075FF']}
            disabled={isButtonDisabled}
            disableGradientLinear={true}
            uppercase={false}>
            {possibleWithdraw && withdrawal_at && (
              <View style={st.gradientButtonContent}>
                <Text style={st.smallText}>
                  {t('common.expected_to_receive')}
                </Text>
                <Text style={st.buttonBigText}>{getCurrentAmount()} BTCa</Text>
              </View>
            )}
          </ButtonGradient>
        </View>
        <View>
          <Text style={st.subTitle}>{t('common.history_transactions')}</Text>
          <View style={st.buttonsRow}>
            <Button
              title={t('common.refill')}
              containerStyle={st.buttonContainer}
              onPress={() => handleKindChange(1)}
              buttonContainerStyle={kind === 1 ? st.buttonGray : st.button}
            />
            <Button
              title={t('common.withdraw')}
              onPress={() => handleKindChange(3)}
              buttonContainerStyle={kind === 3 ? st.buttonGray : st.button}
              containerStyle={st.buttonContainer}
            />
          </View>
          <Text style={st.historyTitle}>
            {t(`assets.history_${kind === 1 ? 'deposit' : 'withdraw'}`)}
          </Text>
          <FlatList
            data={history.slice(0, 4)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <TransactionCard item={item} />}
            ListEmptyComponent={
              <EmptyList
                hideIcon={true}
                containerStyle={st.emptyListContainer}
                title={t('master_nodes_x10.deposit_history_missing')}
              />
            }
          />
          {history.length > 4 && (
            <Button
              title={t('common.show_all')}
              onPress={() => navigation.navigate('MnTransactionScreen')}
              buttonContainerStyle={st.buttonGray}
            />
          )}
        </View>
      </SafeScrollContainer>
    </SafeContainer>
  );
}
