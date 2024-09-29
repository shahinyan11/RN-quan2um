import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import FundraisingCard from '@components/FundraisingCard';
import FundCard from '@components/FundCard';
import {t3} from '@constants/globalStyles';
import {ArrowRight, CurrencyBitcoin} from '@assets/svgs';
import st from './styles';
import NeedHelpCard from '@components/NeedHelpCard';
import {coinsImage} from '@constants/images';
import {getUserFunds, getUserProposals} from '@store/charity';
import NotDonations from '@components/NotDonations';
import {selectUserBalance} from '@store/auth';
import {
  selectUserActiveProposal,
  selectUserActiveSadaka,
  selectUserActiveZakat,
  selectUserFunds,
} from '@store/charity/selectors';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export default function CharityProfile() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {amount} = useSelector(selectUserBalance);
  const userFunds = useSelector(selectUserFunds);
  const activePersonal = useSelector(selectUserActiveProposal);
  const activeZakat = useSelector(selectUserActiveZakat);
  const activeSadaka = useSelector(selectUserActiveSadaka);

  useEffect(() => {
    // if (activeTab === 1) {
    //   return;
    // }

    dispatch(getUserFunds());
    dispatch(getUserProposals({type: MONEY_COLLECTION_IDS.PERSONAL}));
    dispatch(getUserProposals({type: MONEY_COLLECTION_IDS.ZAKAT}));
    dispatch(getUserProposals({type: MONEY_COLLECTION_IDS.SADAKA}));
  }, []);

  // const onTabChange = (tab: number) => {
  //   setActiveTab(tab);
  // };

  return (
    <SafeScrollContainer
      safeContentContainerStyle={{paddingTop: 20, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 20}}>
        <View style={st.card}>
          <View style={st.cardLeft}>
            <CurrencyBitcoin size={25} color={'#000'} />
            <Text style={st.cardTextLight}>{t('common.balance')}</Text>
            <Text style={st.cardText}>
              {t('charity.amount_btca', {amount})}
            </Text>
          </View>

          <Image source={coinsImage} style={st.cardImage} />
        </View>

        {/*<StaticTab*/}
        {/*  containerStyle={st.tabContainer}*/}
        {/*  onChange={onTabChange}*/}
        {/*  tabs={[*/}
        {/*    {id: 1, name: t('common.my_applications')},*/}
        {/*    {id: 2, name: t('common.my_donations')},*/}
        {/*  ]}*/}
        {/*/>*/}

        {activeTab === 1 && <NeedHelpCard showCheckboxes />}

        <View style={{marginTop: 8}}>
          <Pressable
            style={st.row}
            onPress={() => {
              navigation.navigate('ProfileFunds');
            }}>
            <Text style={t3}>{t('charity.charity_fund')}</Text>
            <ArrowRight color={'black'} size={18} />
          </Pressable>
          {userFunds[0] ? (
            <FundCard data={userFunds[0]} containerStyle={st.cardContainer} />
          ) : (
            <NotDonations type={'personal'} containerStyle={st.cardContainer} />
          )}

          <Pressable
            style={st.row}
            onPress={() => {
              navigation.navigate('ProfilePersonalAssistance');
            }}>
            <Text style={t3}>{t('common.personal_assistance')}</Text>

            <ArrowRight color={'black'} size={18} />
          </Pressable>
          {activePersonal ? (
            <FundraisingCard
              data={activePersonal}
              containerStyle={st.cardContainer}
              belongsUser={true}
            />
          ) : (
            <NotDonations type={'personal'} containerStyle={st.cardContainer} />
          )}

          <Pressable
            style={st.row}
            onPress={() => {
              navigation.navigate('ProfileZakat');
            }}>
            <Text style={t3}>{t('common.zakat')}</Text>
            <ArrowRight color={'black'} size={18} />
          </Pressable>
          {activeZakat ? (
            <FundraisingCard
              data={activeZakat}
              containerStyle={st.cardContainer}
              belongsUser={true}
            />
          ) : (
            <NotDonations type={'zakat'} containerStyle={st.cardContainer} />
          )}

          <Pressable
            style={st.row}
            onPress={() => {
              navigation.navigate('ProfileSadaka');
            }}>
            <Text style={t3}>{t('common.sadaka')}</Text>
            <ArrowRight color={'black'} size={18} />
          </Pressable>
          {activeSadaka ? (
            <FundraisingCard
              data={activeSadaka}
              containerStyle={st.cardContainer}
              belongsUser={true}
            />
          ) : (
            <NotDonations type={'sadaka'} containerStyle={st.cardContainer} />
          )}
        </View>
      </View>
    </SafeScrollContainer>
  );
}
