import React, {useEffect} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {Image, Pressable, Text, View} from 'react-native';
import st from './styles';
import {useTranslation} from 'react-i18next';
import {ArrowRight} from '@assets/svgs';
import {t3} from '@constants/globalStyles';

import {useDispatch, useSelector} from 'react-redux';
import FundCard from '@components/FundCard';
import FundraisingCard from '@components/FundraisingCard';
import {useNavigation} from '@react-navigation/native';
import {girlBlackWhite} from '@constants/images';
import {getCollections, getFounds, getUserProposals} from '@store/charity';
import {selectActiveCollections, selectFunds} from '@store/charity/selectors';
import {getUserBalanceApi} from '@store/auth';

export default function CharityFees() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fund = useSelector(selectFunds)[0];
  const activeCollections = useSelector(selectActiveCollections);

  useEffect(() => {
    dispatch(getFounds());
    dispatch(getCollections());
    dispatch(getUserBalanceApi('btca'));
    dispatch(getUserProposals());
  }, []);

  return (
    <SafeScrollContainer
      safeContentContainerStyle={{paddingTop: 20, backgroundColor: 'white'}}
      containerStyle={{paddingBottom: 48}}>
      <View style={{marginHorizontal: 20}}>
        <View style={st.card}>
          <Text style={st.cardTitle}>{t('charity.charity_fund')}</Text>
          <Text style={st.cardText}>{t('charity.support_115_charitable')}</Text>
          <Image source={girlBlackWhite} style={st.cardImage} />
        </View>
        <Pressable
          style={st.row}
          onPress={() => {
            navigation.navigate('FeesFunds');
          }}>
          <Text style={t3}>{t('charity.charity_fund')}</Text>
          <ArrowRight color={'black'} size={18} />
        </Pressable>
        {fund && <FundCard data={fund} />}
        <Pressable
          style={st.row}
          onPress={() => {
            navigation.navigate('FeesPersonalAssistance');
          }}>
          <Text style={t3}>{t('common.personal_assistance')}</Text>
          <ArrowRight color={'black'} size={18} />
        </Pressable>
        {activeCollections.personal && (
          <FundraisingCard data={activeCollections.personal} />
        )}
        <Pressable
          style={st.row}
          onPress={() => {
            navigation.navigate('FeesZakat');
          }}>
          <Text style={t3}>{t('common.zakat')}</Text>
          <ArrowRight color={'black'} size={18} />
        </Pressable>
        {activeCollections.zakat && (
          <FundraisingCard data={activeCollections.zakat} />
        )}
        <Pressable
          style={st.row}
          onPress={() => {
            navigation.navigate('FeesSadaka');
          }}>
          <Text style={t3}>{t('common.sadaka')}</Text>
          <ArrowRight color={'black'} size={18} />
        </Pressable>
        {activeCollections.sadaka && (
          <FundraisingCard data={activeCollections.sadaka} />
        )}
      </View>
    </SafeScrollContainer>
  );
}
