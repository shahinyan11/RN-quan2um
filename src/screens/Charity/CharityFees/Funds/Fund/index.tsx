import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {Checked, Copy} from '@assets/svgs/others';
import {Facebook, Inst, Internet, Ok, Vk} from '@assets/svgs';
import {useDispatch, useSelector} from 'react-redux';
import {showModal} from '@store/modal';
import {selectCurrentFund} from '@store/charity/selectors';
import Clipboard from '@react-native-community/clipboard';
import {onSuccessMessage} from '@store/app';
import Slider from '@components/Slider';

export default function Fund() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const fund = useSelector(selectCurrentFund);

  const sendDonate = () => {
    dispatch(
      showModal({
        modalType: 'SEND_DONATION',
        modalProps: {isFund: true, id: fund.id, balance: fund.balance},
      }),
    );
  };

  const handleCopy = (text: string) => {
    Clipboard.setString(text);

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };

  return (
    <View style={{paddingBottom: 34}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Slider data={fund.images} />
        </View>

        <View style={st.whiteContainer}>
          <View style={st.sign} />
          <View style={st.topBox}>
            <View style={st.icon} />
            <Text style={st.name}>{`${t('charity.fund')} “${fund.name}”`}</Text>
            <Checked />
          </View>

          <Text style={[st.title, {marginBottom: 16}]}>{fund.annotation}</Text>
          <Text style={[st.text, {marginBottom: 40}]}>{fund.description}</Text>
          <Text style={[st.title, {marginBottom: 12}]}>
            {t('charity.about_fund')}
          </Text>
          <Text style={[st.text, {marginBottom: 20}]}>{fund.about}</Text>
          <View>
            <Text style={st.infoLabel}>{t('common.site')}</Text>
            <View style={st.infoBox}>
              <Text style={st.infoText}>{fund.uri}</Text>
              <TouchableOpacity onPress={() => handleCopy(fund.uri)}>
                <Copy color={'#373737'} />
              </TouchableOpacity>
            </View>
            <Text style={st.infoLabel}>{t('common.wallet_number')}</Text>
            <View style={st.infoBox}>
              <Text style={st.infoText}>{fund.wallet}</Text>
              <TouchableOpacity onPress={() => handleCopy(fund.wallet)}>
                <Copy color={'#373737'} />
              </TouchableOpacity>
            </View>
            <Text style={st.infoLabel}>{t('common.region')}</Text>
            <View style={st.infoBox}>
              <Text style={st.infoText}>{fund.region}</Text>
            </View>
            <Text style={st.infoLabel}>
              {t('charity.label_fund_direction')}
            </Text>
            <View style={st.infoBox}>
              <Text style={st.infoText}>{t('charity.help_animals')}</Text>
            </View>
          </View>
          <View style={{paddingTop: 4, marginBottom: 75}}>
            <Text style={st.title}>
              {t('charity.we_are_in_social_networks')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={st.socialBackground}
                onPress={() => Linking.openURL(fund.uri)}>
                <Internet color={'#ACE42C'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={st.socialBackground}
                onPress={() => Linking.openURL(fund.vkontakte)}>
                <Vk />
              </TouchableOpacity>
              <TouchableOpacity
                style={st.socialBackground}
                onPress={() => Linking.openURL(fund.odnoklassniki)}>
                <Ok />
              </TouchableOpacity>
              <TouchableOpacity
                style={st.socialBackground}
                onPress={() => Linking.openURL(fund.facebook)}>
                <Facebook color={'#ACE42C'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={st.socialBackground}
                onPress={() => Linking.openURL(fund.instagram)}>
                <Inst />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable onPress={sendDonate} style={st.button}>
        <Text style={st.buttonText}>{t('charity.send_donation')}</Text>
      </Pressable>
    </View>
  );
}
