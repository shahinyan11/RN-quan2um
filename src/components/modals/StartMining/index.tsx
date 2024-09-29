import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import st from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import InputText from '@components/inputs/InputText';
import {makeInvestment, selectMasterNodeData} from '@store/ecomining';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '@store/modal';
import Tab from '@components/Tab';
import {ClockIcon, CompletedIcon, WarnIcon} from '@assets/svgs';
import {selectUser} from '@store/auth';
import {START_MINING_TABS} from '@constants/index';
import {navigationRef} from '@navigation/index';

export default function StartMining() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const verificationStatus = user?.verification.status;
  const [onBonusTab, setOnBonusTab] = useState(false);
  const {is_verified} = useSelector(selectUser);
  const {balance, balance_face, bonus_wallet, node_investments} =
    useSelector(selectMasterNodeData);

  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (
      onBonusTab &&
      !is_verified &&
      !['completed', 'process'].includes(verificationStatus)
    ) {
      navigationRef.current.navigate('VerificationProfile');
      closeModal();
    } else {
      dispatch(
        makeInvestment({
          amount: +amount,
          isBonus: onBonusTab,
        }),
      );
    }
  };

  const handleTabChange = tab => {
    setOnBonusTab(tab === START_MINING_TABS[1].id);
  };

  const hideInput = useMemo(() => {
    const isExistsBonusMasterNode = node_investments.find(
      value => value.isBonus,
    );

    return (
      onBonusTab &&
      ((!is_verified && verificationStatus !== 'completed') ||
        (!bonus_wallet?.amount && isExistsBonusMasterNode))
    );
  }, [onBonusTab, bonus_wallet, verificationStatus, node_investments]);

  const buttonTitle = useMemo(() => {
    let text = t('invest_mn.outcome_coins');

    if (
      onBonusTab &&
      !is_verified &&
      !['completed', 'process'].includes(verificationStatus)
    ) {
      text = t('common.pass_kyc');
    }

    return text;
  }, [onBonusTab, verificationStatus]);

  const isButtonActive = useMemo(() => {
    if (onBonusTab) {
      return (
        (+amount > 0 &&
          +bonus_wallet?.amount &&
          (is_verified || verificationStatus !== 'process')) ||
        (!is_verified && !['completed', 'process'].includes(verificationStatus))
      );
    } else {
      return +amount > 0 && +balance;
    }
  }, [amount, verificationStatus, onBonusTab, balance, bonus_wallet]);

  const renderTextByStatus = useCallback(() => {
    if (is_verified || verificationStatus === 'completed') {
      return (
        <>
          <CompletedIcon />
          <View style={{flex: 1}}>
            <Text style={st.textSmall}>
              {t('bonus.bonus_coins_in_masternode')}
            </Text>
          </View>
        </>
      );
    }

    if (verificationStatus === 'process') {
      return (
        <>
          <ClockIcon />
          <View style={{flex: 1}}>
            <Text style={st.textSmall}>
              {t('bonus.wait_end_of_check_verification')}
            </Text>
          </View>
        </>
      );
    }

    return (
      <>
        <WarnIcon />
        <View style={{flex: 1}}>
          <Text style={st.textSmall}>
            {t('bonus.verification_to_use_bonuses')}
          </Text>
        </View>
      </>
    );
  }, [is_verified, verificationStatus]);

  const handleChange = (val: string) => {
    setAmount(val.replace(/(\.|,)+/g, '.'));
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={st.container}>
        <Pressable style={{flex: 1}} onPress={closeModal} />
        <View style={st.sheet}>
          <View style={st.indicator} />
          <Tab
            onChange={handleTabChange}
            containerStyle={st.tabContainer}
            tabs={START_MINING_TABS}
          />
          <Text>
            <Text style={st.textDark}>{t('common.balance')}: </Text>
            <Text style={onBonusTab ? st.textGreen : st.text}>
              {(onBonusTab ? bonus_wallet?.amount : balance_face) || 0} BTCa
            </Text>
          </Text>

          {!hideInput && (
            <InputText
              value={amount}
              onChangeText={handleChange}
              keyboardType="numeric"
              addAfter={
                <View style={st.after}>
                  <Pressable
                    onPress={() => {
                      setAmount(
                        onBonusTab ? bonus_wallet?.amount : balance_face,
                      );
                    }}>
                    <Text style={onBonusTab ? st.textGreen : st.textActive}>
                      {t('common.all')}
                    </Text>
                  </Pressable>
                  <View style={st.line} />
                  <Text style={st.textDark}>BTCa</Text>
                </View>
              }
            />
          )}

          {onBonusTab && hideInput && (
            <View style={st.row}>{renderTextByStatus()}</View>
          )}

          <ButtonGradient
            containerStyle={st.buttonContainer}
            disabled={!isButtonActive}
            disableType={'opacity'}
            title={buttonTitle}
            onPress={handleSubmit}
            gradientColors={['#00FF75', '#0075FF']}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
