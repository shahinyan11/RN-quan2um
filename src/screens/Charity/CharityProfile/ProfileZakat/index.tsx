import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import FundraisingCard from '@components/FundraisingCard';
import ScrollableTab from '@components/ScrollableTab';
import {selectUserZakats} from '@store/charity/selectors';
import {getUserProposals} from '@store/charity';
import {
  MONEY_COLLECTION_IDS,
  MONEY_COLLECTION_STATUS_TAB,
} from '@constants/index';
import st from './styles';

export default function ProfileZakat() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState();
  const userZakats = useSelector(selectUserZakats);

  useEffect(() => {
    dispatch(
      getUserProposals({
        type: MONEY_COLLECTION_IDS.ZAKAT,
        status: activeTab,
      }),
    );
  }, [activeTab]);

  const onTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <ScrollableTab
        tabs={MONEY_COLLECTION_STATUS_TAB}
        onChange={onTabChange}
        activeTab={activeTab}
      />
      <View style={{marginHorizontal: 20}}>
        {userZakats?.map(item => (
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
