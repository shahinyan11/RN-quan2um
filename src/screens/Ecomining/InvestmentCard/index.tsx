import React, {useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import st from './styles';
import {ChevronDown} from '@assets/svgs';
import {useDispatch} from 'react-redux';
import {showModal} from '@store/modal';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

type Props = {
  id: number;
  name: string;
  address: string;
  deposit_face: string;
  deposit_bonus_face: string;
  currencyCode: string;
  reward_face: string;
  fee_face: string;
  profit_face: string;
  withdrawal_at: number;
  cancelling_at: number;
  can_withdrawal: boolean;
};

function InvestmentCard({
  id,
  name,
  address,
  deposit_face,
  currencyCode,
  deposit_bonus_face,
  reward_face,
  fee_face,
  profit_face,
  withdrawal_at,
  cancelling_at,
  can_withdrawal,
}: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const time = withdrawal_at || cancelling_at;

  const handleWithdraw = () => {
    dispatch(
      showModal({
        modalType: 'WITHDRAWAL',
        modalProps: {
          id: id,
          canWithdrawal: can_withdrawal || isFinished,
        },
      }),
    );
  };

  const countDownTime = useMemo(() => {
    return moment(time * 1000).diff(moment()) / 1000;
  }, [time]);

  return (
    <View style={st.container}>
      <View style={st.row}>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={open ? st.closeIcon : null}>
          <ChevronDown />
        </TouchableOpacity>

        <Text style={st.smallValue}>{name}</Text>
      </View>
      {open && (
        <>
          <View style={st.row}>
            <Text style={st.key}>{t('invest_mn.investements_address')}</Text>
            <Text
              style={st.smallValue}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {address}
            </Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('invest_mn.investements_deposit')}</Text>
            <Text style={st.value}>{`${deposit_face} ${currencyCode}`}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>
              {t('invest_mn.investements_bonus_deposit')}
            </Text>
            <Text
              style={st.value}>{`${deposit_bonus_face} ${currencyCode}`}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('invest_mn.kind_reward')}</Text>
            <Text style={st.value}>{`${reward_face} ${currencyCode}`}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.fee')}</Text>
            <Text style={st.redValue}>{`+ ${fee_face} ${currencyCode}`}</Text>
          </View>
          <View style={st.row}>
            <Text style={st.key}>{t('common.profit')}</Text>
            <Text
              style={st.greenValue}>{`+ ${profit_face} ${currencyCode}`}</Text>
          </View>
          <TouchableOpacity onPress={handleWithdraw} style={st.row}>
            <Text style={st.withdraw}>{t('common.withdraw')}</Text>
            {countDownTime > 0 && (
              <CountDown
                id={`${moment().valueOf()}`}
                until={countDownTime}
                onFinish={() => setIsFinished(true)}
                digitTxtStyle={st.countDownText}
                separatorStyle={st.countDownText}
                digitStyle={{
                  height: 14,
                  width: 'auto',
                }}
                timeLabelStyle={{display: 'none'}}
                showSeparator={true}
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default InvestmentCard;
