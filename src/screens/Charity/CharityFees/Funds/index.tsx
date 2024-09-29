import React, {useEffect, useRef, useState} from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {t3} from '@constants/globalStyles';

import {useDispatch, useSelector} from 'react-redux';
import FundCard from '@components/FundCard';
import st from './styles';
import {useNavigation} from '@react-navigation/native';
import {girlBlackWhite} from '@constants/images';
import {selectCharityStore, selectFundTypes} from '@store/charity/selectors';
import {selectIsAuth, selectUser} from '@store/auth';
import {showModal} from '@store/modal';
import {navigationRef} from '@navigation/index';
import {getFounds, getFoundTypes} from '@store/charity';
import {AUTH_REQUIRED} from '@components/modals/Information/constantProps';

export default function Funds() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeIndex, setactiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const {fundList} = useSelector(selectCharityStore);
  const {is_verified} = useSelector(selectUser);
  const fundTypes = useSelector(selectFundTypes);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(getFoundTypes());
  }, []);

  const registerFund = () => {
    if (!isAuth) {
      dispatch(
        showModal({
          modalType: 'INFORMATION',
          modalProps: AUTH_REQUIRED,
        }),
      );

      return;
    }

    if (is_verified) {
      navigation.navigate('ApplicationRegistration');
      return;
    }

    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          title: t('charity.to_create_fund_page'),
          firstBtnText: t('charity.pass_kyc_verification'),
          firstBtnAction: () =>
            navigationRef.current?.navigate('VerificationProfile'),
        },
      }),
    );
  };

  const handleTabChange = (index: number, typeId: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });

    setactiveIndex(index);
    dispatch(getFounds(typeId));
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        style={index === activeIndex ? st.activeTabItem : st.tabItem}
        onPress={() => handleTabChange(index, item.id)}>
        <Text style={index === activeIndex ? st.activeTabText : st.tabText}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      safeContentContainerStyle={st.container}>
      <View style={{marginHorizontal: 20, marginBottom: 10}}>
        <View style={st.card}>
          <Text style={st.cardTitle}>{t('charity.charity_fund')}</Text>
          <Text style={st.cardText}>{t('charity.funds_description')}</Text>
          <Image source={girlBlackWhite} style={st.cardImage} />
        </View>

        <View style={st.blackBox}>
          <Text style={st.whiteTitle}>{t('charity.are_you_fund_owner')}</Text>
          <Text style={st.whiteDescription}>
            {t('charity.accept_donations')}
          </Text>
          <Pressable style={st.button} onPress={registerFund}>
            <Text style={st.buttonText}>{t('charity.register_fund')}</Text>
          </Pressable>
        </View>
        <Text style={t3}>{t('charity.charity_fund')}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={fundTypes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{width: 8}} />}
        contentContainerStyle={st.flatList}
      />
      <View style={{marginHorizontal: 20}}>
        {fundList?.map(fundItem => (
          <View style={{marginBottom: 20}}>
            <FundCard key={fundItem.id} data={fundItem} />
          </View>
        ))}
        {/*<Pressable style={simpleTransparent.container}>*/}
        {/*  <Text style={simpleTransparent.text}>{t('charity.load_more')}</Text>*/}
        {/*</Pressable>*/}
      </View>
    </SafeScrollContainer>
  );
}
