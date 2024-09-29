import React, {useState} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';
import st from './styles';
import {selectUserFunds} from '@store/charity/selectors';
import FundCard from '@components/FundCard';

export default function ProfileFunds() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState();
  const userFunds = useSelector(selectUserFunds);

  const onTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  // const fundList = useMemo(
  //   () => (activeTab === 1 ? completedFunds : activeFunds),
  //   [activeTab],
  // );

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <View style={{marginHorizontal: 20}}>
        {userFunds?.map(fund => (
          <View style={{marginBottom: 20}}>
            <FundCard
              key={fund.id}
              data={fund}
              userDonation={'50'}
              belongsUser={true}
            />
          </View>
        ))}
        {/*<Pressable style={simpleTransparent.container}>*/}
        {/*  <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>*/}
        {/*</Pressable>*/}
      </View>
    </SafeScrollContainer>
  );
}
