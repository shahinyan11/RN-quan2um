import React, {useCallback, useEffect} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import st from './styles';
import FundraisingCard from '@components/FundraisingCard';
import {showModal} from '@store/modal';
import {Info} from '@assets/svgs';
import {sadakaBlackWhite} from '@constants/images';
import {
  selectActiveCollections,
  selectSadakas,
  selectUserActiveProposal,
} from '@store/charity/selectors';
import {
  ALREADY_APPLIED,
  NEED_KYC,
} from '@components/modals/Information/constantProps';
import {selectUser} from '@store/auth';
import {getFinishedCollections} from '@store/charity';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export default function Sadaka() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {is_verified} = useSelector(selectUser);
  const activeCollection = useSelector(selectActiveCollections);
  const userActiveProposal = useSelector(selectUserActiveProposal);
  const sadakas = useSelector(selectSadakas);

  useEffect(() => {
    dispatch(getFinishedCollections(MONEY_COLLECTION_IDS.SADAKA));
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

  const onIconPress = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          title: t('common.data_storage'),
          description: t('charity.we_do_not_publish_profiles'),
          firstBtnText: t('charity.go_to_explorer'),
          alignmentOfTexts: 'left',
        },
      }),
    );
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      safeContentContainerStyle={st.container}>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <View style={st.card}>
          <View style={st.row}>
            <Text style={st.cardTitle}>{t('common.sadaka')}</Text>
            <TouchableOpacity onPress={onIconPress}>
              <Info size={20} color={'#373737'} />
            </TouchableOpacity>
          </View>
          <Text style={st.cardText}>{t('charity.help_fellow_believers')}</Text>
          <Image source={sadakaBlackWhite} style={st.cardImage} />
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
          {activeCollection.sadaka && (
            <FundraisingCard
              buttonText={t('charity.donate')}
              data={activeCollection.sadaka}
            />
          )}
        </View>
        <View>
          <Text style={st.sectionTitle}>
            {t('charity.completed_collection')}
          </Text>
          {sadakas?.map(item => (
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
