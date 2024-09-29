import React from 'react';
import {Pressable, StyleProp, Text, View, ViewStyle} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';
import st from './styles';
import {FileOutline} from '@assets/svgs/others';
import ApplicationStatus from '@components/ApplicationStatus';
import {showModal} from '@store/modal';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {navigationRef} from '@navigation/index';
import {AUTH_REQUIRED} from '@components/modals/Information/constantProps';
import {selectIsAuth} from '@store/auth';
import {TEXTS_BY_MC_STATUS} from '@constants/index';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: any;
  isActive?: boolean;
  buttonText?: string;
  userDonation?: number | string;
  applicationStatus?: string;
  belongsUser?: boolean;
}

export default function FundraisingCard({
  containerStyle,
  isActive = true,
  buttonText,
  userDonation,
  belongsUser = false,
  data,
}: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onViewReport = () => {
    // dispatch(getWithdrawalLogs(data?.id));
    navigationRef.current?.navigate('TransactionCheck', {transaction: data});
  };

  const onDonate = () => {
    if (isAuth) {
      dispatch(
        showModal({
          modalType: 'SEND_DONATION',
          modalProps: {id: data?.id, balance: data?.balance},
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

  const handlePress = () => {
    isActive ? onDonate() : onViewReport();
  };

  return (
    <View style={[st.container, containerStyle]}>
      <View style={st.topContainer}>
        {belongsUser && (
          <ApplicationStatus
            containerStyle={{marginBottom: 16, marginTop: 4}}
            text={TEXTS_BY_MC_STATUS[data.status].STATUS_TEXT}
            color={TEXTS_BY_MC_STATUS[data.status].COLOR}
          />
        )}
        <Text style={st.title}>
          {t('charity.fundraising')} №{data?.id}
        </Text>
        {!isActive && (
          <Pressable style={[st.buttonTransparent, {marginTop: 8}]}>
            <FileOutline />
            <Text style={st.buttonText}>
              {t('charity.fundraising')}&nbsp; №{data?.id}&nbsp;
              {t('common.from')}&nbsp;
              {moment(data?.start_date).format('DD.MM.YY')}
            </Text>
          </Pressable>
        )}
        <View style={{marginTop: 20}}>
          <View style={st.row}>
            <Text style={st.textKey}>{t('charity.funds_collected')}</Text>
            <Text style={st.textValue}>
              {t('charity.amount_btca', {amount: data?.amount})}
            </Text>
          </View>
          <View style={st.divider} />
          <View style={st.row}>
            <Text style={st.textKey}>{t('charity.applications_received')}</Text>
            <Text style={st.textValue}>
              {t('charity.count_applications', {count: data?.user_count})}
            </Text>
          </View>
          <View style={st.divider} />
          <View style={st.row}>
            <Text style={st.textKey}>
              {isActive
                ? t('charity.dates_holding')
                : t('charity.allocation_per_application')}
            </Text>
            <Text style={st.textValue}>
              {moment(data?.start_date).format('DD.MM.YY')}
              {' - '}
              {moment(data?.end_date).format('DD.MM.YY')}
            </Text>
          </View>
        </View>
      </View>
      {userDonation && (
        <View style={st.donationContainer}>
          <Text style={st.text}>{t('common.you_sent')}</Text>
          <Text style={st.textValue}>32 489 BTCa</Text>
        </View>
      )}
      <View style={st.bottomContainer}>
        {!belongsUser && (
          <>
            <Pressable style={st.button} onPress={handlePress}>
              <Text style={st.buttonText}>
                {buttonText || t('charity.donate')}
              </Text>
            </Pressable>

            <Text style={st.bottomText}>
              <Trans
                i18nKey={'charity.personal_assistance_how_to_make_sure'}
                components={{span: <Text style={st.greenText} />}}
              />
            </Text>
          </>
        )}

        {belongsUser && (
          <>
            <Pressable
              style={[st.buttonTransparent, {marginBottom: 20}]}
              onPress={() => {}}>
              <Text style={st.buttonText}>
                {data.rejection_reason ||
                  TEXTS_BY_MC_STATUS[data.status].BUTTON_TEXT}
              </Text>
            </Pressable>
            {/*<TouchableOpacity style={st.editButton} onPress={() => {}}>*/}
            {/*  <Text style={st.greenText}>{t('common.edit_data')}</Text>*/}
            {/*</TouchableOpacity>*/}
          </>
        )}
      </View>
    </View>
  );
}
