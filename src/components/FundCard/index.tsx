import React from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {Checked} from '@assets/svgs/others';
import ApplicationStatus from '@components/ApplicationStatus';
import {useNavigation} from '@react-navigation/native';
import {showModal} from '@store/modal';
import {useDispatch, useSelector} from 'react-redux';
import {getFoundById} from '@store/charity';
import NotDonations from '@components/NotDonations';
import {selectIsAuth} from '@store/auth';
import {AUTH_REQUIRED} from '@components/modals/Information/constantProps';
import getImageUrl from '@utils/getFullUrl';
import {TEXTS_BY_MC_STATUS} from '@constants/index';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  userDonation?: number | string;
  isActive?: boolean;
  applicationStatus?: string;
  data: any;
  belongsUser?: boolean;
}

export default function FundCard({
  containerStyle,
  userDonation,
  isActive = true,
  belongsUser = false,
  data,
}: Props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const handleDonate = () => {
    if (isAuth) {
      dispatch(
        showModal({
          modalType: 'SEND_DONATION',
          modalProps: {
            id: data.id,
            balance: data.balance,
            isFund: true,
          },
        }),
      );

      return;
    }

    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: AUTH_REQUIRED,
      }),
    );
  };

  const handleMoreAboutPress = () => {
    dispatch(getFoundById(data.id));
    navigation.navigate('FeesFunds', {screen: 'Fund'});
  };

  const onPressEdit = () => {
    navigation.navigate('FeesFunds', {screen: 'ApplicationRegistration'});
  };

  if (!data?.id) {
    return <NotDonations type={'fund'} containerStyle={containerStyle} />;
  }

  return (
    <View style={[st.container, containerStyle]}>
      <Image source={{uri: getImageUrl(data.cover)}} style={st.image} />
      <View style={st.topBox}>
        <View style={st.icon} />
        <Text style={st.name} numberOfLines={1} ellipsizeMode="tail">{`${t(
          'charity.fund',
        )} “${data?.name}”`}</Text>
        <Checked />
      </View>
      <View style={st.whiteContainer}>
        <View style={st.pHorizontal}>
          {belongsUser && (
            <ApplicationStatus
              containerStyle={{marginBottom: 16, marginTop: 4}}
              text={TEXTS_BY_MC_STATUS[data.status].STATUS_TEXT}
              color={TEXTS_BY_MC_STATUS[data.status].COLOR}
            />
          )}
          <Text style={st.title}>{data?.annotation}</Text>
          <View style={{marginBottom: 20}}>
            <Text style={st.lightText} numberOfLines={4}>
              {data?.about}
            </Text>
            {!belongsUser && (
              <TouchableOpacity onPress={handleMoreAboutPress}>
                <Text style={st.greenText}>{t('charity.more_about_fund')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {!isActive && (
            <View style={{marginBottom: 20}}>
              <View style={st.row}>
                <Text style={st.textKey}>{t('charity.was_collected')}</Text>
                <Text style={st.textValue}>32 489 BTCa</Text>
              </View>
              <View style={st.divider} />
              <View style={st.row}>
                <Text style={st.textKey}>
                  {t('charity.applications_received')}
                </Text>
                <Text style={st.textValue}>45 заявок</Text>
              </View>
            </View>
          )}
        </View>

        {userDonation && (
          <View style={[st.donationContainer, st.pHorizontal]}>
            <Text style={st.text}>{t('charity.you_sent')}</Text>
            <Text style={st.textBold}>32 489 BTCa</Text>
          </View>
        )}
        <View style={st.pHorizontal}>
          <TouchableOpacity
            style={!belongsUser ? st.button : st.buttonTransparent}
            onPress={handleDonate}>
            <Text style={st.buttonText}>{t('charity.donate')}</Text>
          </TouchableOpacity>
          {belongsUser && (
            <TouchableOpacity style={st.editButton} onPress={onPressEdit}>
              <Text style={st.greenText}>{t('common.edit_data')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
