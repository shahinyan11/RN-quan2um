import React, {useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as SVG from '@assets/svgs/others';
import st from './styles';
import {
  getReferralAccrualHistory,
  getReferralInvitation,
  getReferralReward,
} from '@store/referral/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '@components/containers/EmptyList';
import HistoryItem from '@screens/Profile/ReferralProgramScreen/HistoryItem';
import Clipboard from '@react-native-community/clipboard';
import {onSuccessMessage, selectBaseUrl} from '@store/app';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';

const ReferralProgramScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const basUrl = useSelector(selectBaseUrl);
  const {accrualHistory, invitation, reward} = useSelector(
    state => state.referrals,
  );

  useEffect(() => {
    dispatch(getReferralAccrualHistory());
    dispatch(getReferralInvitation());
    dispatch(getReferralReward());
  }, []);

  const onCopyLink = () => {
    Clipboard.setString(invitation.referral_link.toString());

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };

  const onCopyId = () => {
    Clipboard.setString(invitation.referral_id.toString());

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };

  const handleReadMore = () => {
    Linking.openURL(t('referral.more_about_program_url'));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={st.description}>
          {t('referral.referral_program_invite_friends')}
        </Text>
        <LinearGradient
          colors={['#41415B', '#282838', '#2D2D41']}
          {...deg(154)}
          style={st.container}>
          <Text style={st.infoTitle}>{t('referral.use_for_invitation')}</Text>
          <View style={st.infoField}>
            <Text style={st.grayText}>{t('referral.referral_link')}</Text>
            <View style={st.row}>
              <Text style={st.whiteText} numberOfLines={1}>
                {/*{basUrl + invitation.referral_link}*/}
                {`https://q2.eco/registration?account_id=${invitation.referral_id}`}
              </Text>
              <Pressable style={{marginLeft: 10}} onPress={onCopyLink}>
                <SVG.Copy size={20} color={'white'} />
              </Pressable>
            </View>
          </View>
          <View style={st.infoField}>
            <Text style={st.grayText}>{t('referral.referral_id')}</Text>
            <View style={st.row}>
              <Text style={st.whiteText} numberOfLines={1}>
                {invitation.referral_id}
              </Text>
              <Pressable style={{marginLeft: 10}} onPress={onCopyId}>
                <SVG.Copy size={20} color={'white'} />
              </Pressable>
            </View>
          </View>
          {/*<View style={st.infoField}>*/}
          {/*  <Text style={st.grayText}>{t('referral.qr_code')}</Text>*/}
          {/*</View>*/}
        </LinearGradient>
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={st.morInfoText}>{t('referral.more_about_program')}</Text>
        </TouchableOpacity>
        <View style={st.container}>
          <View style={st.centered}>
            <SVG.Info size={20} color={'white'} />
            <Text style={st.whiteText}>{t('referral.eco_mining_rewards')}</Text>
            <Text style={st.greenText} numberOfLines={1}>
              {reward.masternodes_reward}%
            </Text>
          </View>
          <View style={st.centered}>
            <SVG.Info size={20} color={'white'} />
            <Text style={st.whiteText}>{t('referral.trade_rewards')}</Text>
            <Text style={st.blueText} numberOfLines={1}>
              {reward.trades_reward}%
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <View style={st.infoFieldDark}>
              <Text style={st.whiteText}>{t('referral.total_friends')}</Text>
              <Text style={st.valueText}>{reward.friends_count}</Text>
            </View>
            <View style={st.infoFieldDark}>
              <Text style={st.whiteText}>{t('referral.your_earnings')}</Text>
              <Text style={st.valueText}>{reward.income}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={st.historyTitle}>{t('referral.history_title')}</Text>
          <FlatList
            data={accrualHistory}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <HistoryItem item={item} />}
            ListEmptyComponent={<EmptyList />}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ReferralProgramScreen;
