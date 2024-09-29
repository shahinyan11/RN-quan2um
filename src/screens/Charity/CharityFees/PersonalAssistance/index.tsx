import React, {useEffect} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import FundraisingCard from '@components/FundraisingCard';
import {helpBlackWhite} from '@constants/images';
import {selectUser} from '@store/auth';
import {showModal} from '@store/modal';
import {Info} from '@assets/svgs';
import st from './styles';
import {
  selectActiveCollections,
  selectPersonals,
  selectUserActiveProposal,
} from '@store/charity/selectors';
import {
  ALREADY_APPLIED,
  NEED_KYC,
} from '@components/modals/Information/constantProps';
import {getFinishedCollections} from '@store/charity';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export default function PersonalAssistance() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {is_verified} = useSelector(selectUser);
  const userActiveProposal = useSelector(selectUserActiveProposal);
  const activeCollection = useSelector(selectActiveCollections);
  const personals = useSelector(selectPersonals);

  useEffect(() => {
    dispatch(getFinishedCollections(MONEY_COLLECTION_IDS.PERSONAL));
  }, []);

  const onInfoIconPress = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          title: t('charity.data_storage'),
          description: t('charity.zakat_we_do_not_publish_profiles'),
          alignmentOfTexts: 'left',
          firstBtnText: t('common.go_to_explorer'),
          firstBtnAction: () => {},
        },
      }),
    );
  };

  const handleGetHelp = () => {
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

    navigation.navigate('ApplicationRegistration');
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      safeContentContainerStyle={st.container}>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <View style={st.card}>
          <View style={st.row}>
            <Text style={st.cardTitle}>{t('common.personal_assistance')}</Text>
            <TouchableOpacity onPress={onInfoIconPress}>
              <Info size={20} />
            </TouchableOpacity>
          </View>
          <Text style={st.cardText}>
            {t('charity.applications_for_personal_assistance')}
          </Text>
          <Image source={helpBlackWhite} style={st.cardImage} />
        </View>
        <View style={st.blackBox}>
          <Text style={st.whiteTitle}>{t('charity.do_you_need_help')}</Text>
          <Text style={st.whiteDescription}>
            {t('charity.if_you_in_difficult_life_situation')}
          </Text>
          <Pressable style={st.button} onPress={handleGetHelp}>
            <Text style={st.buttonText}>{t('charity.get_help')}</Text>
          </Pressable>
        </View>
        <View style={{marginBottom: 48}}>
          <Text style={st.sectionTitle}>{t('charity.active_collection')}</Text>
          {activeCollection.personal && (
            <FundraisingCard
              buttonText={t('charity.donate')}
              data={activeCollection.personal}
            />
          )}
        </View>
        <View>
          <Text style={st.sectionTitle}>
            {t('charity.completed_collection')}
          </Text>
          {personals?.map(item => (
            <View key={item.id} style={{marginBottom: 20}}>
              <FundraisingCard
                buttonText={t('charity.view_report')}
                isActive={false}
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
