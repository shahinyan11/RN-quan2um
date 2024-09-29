import React, {useMemo, useState} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useSelector} from 'react-redux';
import StaticTab from '@components/StaticTab';
import st from './styles';
import {
  selectActiveFunds,
  selectCompletedFunds,
} from '@store/charity/selectors';
import FundCard from '@components/FundCard';

export default function ProfileFunds() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const activeFunds = useSelector(selectActiveFunds);
  const completedFunds = useSelector(selectCompletedFunds);

  const onTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const fundList = useMemo(
    () => (activeTab === 1 ? activeFunds : completedFunds),
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
        {fundList?.map(fund => (
          <View style={{marginBottom: 20}}>
            <FundCard key={fund.id} data={fund} userDonation={'50'} />
          </View>
        ))}
        {/*<Pressable style={simpleTransparent.container}>*/}
        {/*  <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>*/}
        {/*</Pressable>*/}
      </View>
    </SafeScrollContainer>
  );
}
