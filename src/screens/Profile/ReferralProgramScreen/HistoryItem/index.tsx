import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import moment from 'moment/moment';
import FitCurrency from '@components/FitCurrency';

const HistoryItem = ({item}: any) => {
  const {t} = useTranslation();

  return (
    <View style={st.container}>
      <View style={st.row}>
        <Text style={st.grayText}>{t('referral.referral_bonuses_earned')}</Text>
        <Text style={st.whiteText}>
          <FitCurrency amount={item.amount} reduce={true} count={8} />
        </Text>
      </View>
      <View style={st.row}>
        <Text style={st.grayText}>{t('referral.reward_type')}</Text>
        <Text style={st.whiteText}>{item.reward_type}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.grayText}>{t('referral.friend_user_id')}</Text>
        <Text style={st.whiteText}>{item.friend_account_id}</Text>
      </View>
      <View>
        <Text style={st.grayText}>{t('referral.date')}</Text>
        <Text style={st.whiteText}>
          {moment(item.date * 1000).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
      </View>
    </View>
  );
};

export default HistoryItem;
