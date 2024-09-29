import React, {useMemo, useState} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {simpleTransparent} from '@constants/buttonStyles';
import FundraisingCard from '@components/FundraisingCard';
import StaticTab from '@components/StaticTab';
import {useSelector} from 'react-redux';
import {selectCollectionsZakatGruoped} from '@store/charity/selectors';

export default function ProfilePersonalAssistance() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const {activeList, completedList} = useSelector(
    selectCollectionsZakatGruoped,
  );

  const onTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const collections = useMemo(
    () => (activeTab === 1 ? activeList : completedList),
    [activeTab],
  );

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <View style={{marginHorizontal: 20}}>
        <StaticTab
          containerStyle={st.tab}
          onChange={onTabChange}
          tabs={[
            {id: 1, name: t('charity.active_fees')},
            {id: 2, name: t('charity.completed_fees')},
          ]}
        />
        {collections?.map((val, index) => (
          <View style={{marginBottom: 20}}>
            <FundraisingCard
              key={index}
              buttonText={t('charity.view_report')}
              isActive={false}
            />
          </View>
        ))}
        <Pressable style={simpleTransparent.container}>
          <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>
        </Pressable>
      </View>
    </SafeScrollContainer>
  );
}
