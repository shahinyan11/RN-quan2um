import React, {useEffect, useState} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import FundraisingCard from '@components/FundraisingCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserSadakas} from '@store/charity/selectors';
import {
  MONEY_COLLECTION_IDS,
  MONEY_COLLECTION_STATUS_TAB,
} from '@constants/index';
import ScrollableTab from '@components/ScrollableTab';
import {getUserProposals} from '@store/charity';

export default function ProfileSadaka() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState();
  const userSadakas = useSelector(selectUserSadakas);

  useEffect(() => {
    dispatch(
      getUserProposals({
        type: MONEY_COLLECTION_IDS.SADAKA,
        status: activeTab,
      }),
    );
  }, [activeTab]);

  const onTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <SafeScrollContainer
      safeContentContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <ScrollableTab
        tabs={MONEY_COLLECTION_STATUS_TAB}
        onChange={onTabChange}
        activeTab={activeTab}
      />
      <View style={{marginHorizontal: 20}}>
        {userSadakas?.map(item => (
          <View style={{marginBottom: 20}}>
            <FundraisingCard key={item.id} data={item} belongsUser={true} />
          </View>
        ))}
        {/*<Pressable style={simpleTransparent.container}>*/}
        {/*  <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>*/}
        {/*</Pressable>*/}
      </View>
    </SafeScrollContainer>
  );
}
