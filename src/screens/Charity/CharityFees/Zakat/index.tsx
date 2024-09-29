import React, {useCallback, useEffect} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import FundraisingCard from '@components/FundraisingCard';
import {zakatBlackWhite} from '@constants/images';
import st from './styles';
import {
  selectActiveCollections,
  selectUserActiveProposal,
  selectZakats,
} from '@store/charity/selectors';
import {showModal} from '@store/modal';
import {
  ALREADY_APPLIED,
  NEED_KYC,
} from '@components/modals/Information/constantProps';
import {selectUser} from '@store/auth';
import {getFinishedCollections} from '@store/charity';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export default function Zakat() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {is_verified} = useSelector(selectUser);
  const activeCollection = useSelector(selectActiveCollections);
  const userActiveProposal = useSelector(selectUserActiveProposal);
  const zakats = useSelector(selectZakats);

  useEffect(() => {
    dispatch(getFinishedCollections(MONEY_COLLECTION_IDS.ZAKAT));
  }, []);

  const handleReadMore = useCallback(() => {
    navigation.navigate('Nisab');
  }, []);

  const handleGetHelp = useCallback(() => {
    if (!is_verified) {
      dispatch(
        showModal({
          modalType: 'INFORMATION',
          modalProps: NEED_KYC,
        }),
      );
      return;
    }

    if (userActiveProposal) {
      dispatch(
        showModal({
          modalType: 'INFORMATION',
          modalProps: ALREADY_APPLIED,
        }),
      );
      return;
    }

    navigation.navigate('StartTest');
  }, [userActiveProposal]);

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      safeContentContainerStyle={st.container}>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <View style={st.card}>
          <Text style={st.cardTitle}>{t('common.zakat')}</Text>
          <Text style={st.cardText}>
            {t('charity.zakat_one_pillars_of_islam')}
          </Text>
          <TouchableOpacity onPress={handleReadMore}>
            <Text style={st.redMore}>{t('common.read_more')}</Text>
          </TouchableOpacity>
          <Image source={zakatBlackWhite} style={st.cardImage} />
        </View>
        <View style={st.blackBox}>
          <Text style={st.whiteTitle}>{t('charity.do_you_need_help')}</Text>
          <Text style={st.whiteDescription}>
            {t('charity.if_you_need_financial_assistance')}
          </Text>
          <Pressable style={st.button} onPress={handleGetHelp}>
            <Text style={st.buttonText}>{t('charity.get_help')}</Text>
          </Pressable>
        </View>
        <View style={{marginBottom: 48}}>
          <Text style={st.sectionTitle}>{t('charity.active_collection')}</Text>
          {activeCollection.zakat && (
            <FundraisingCard
              buttonText={t('charity.donate')}
              data={activeCollection.zakat}
            />
          )}
        </View>
        <View>
          <Text style={st.sectionTitle}>
            {t('charity.completed_collection')}
          </Text>
          {zakats?.map(item => (
            <View key={item.id} style={{marginBottom: 20}}>
              <FundraisingCard
                isActive={false}
                buttonText={t('charity.view_report')}
                data={item}
              />
            </View>
          ))}
        </View>

        {/*<Pressable style={simpleTransparent.container}>*/}
        {/*  <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>*/}
        {/*</Pressable>*/}
      </View>
    </SafeScrollContainer>
  );
}
