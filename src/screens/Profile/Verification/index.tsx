import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Row from '@components/containers/Row';
import ContainerItem from '@components/containers/ContainerItem';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';
import IconGradient from '@components/icons/IconGradient';
import InputCountry from '@components/inputs/InputCountry';
import ButtonGradient from '@components/buttons/ButtonGradient';

import styles from './styles';
import {ChooseDocumentsProps} from '@navigation/config/types';

import {onVerificationCreate} from '@store/account';

import {
  DocumentType,
  Verification as VerificationResponse,
} from '@store/account/types';
import useFetch from '@hooks/useFetch';
import {ACCOUNT_VERIFICATION_SETTINGS} from '@api';
import {getUserInfo, selectUser} from '@store/auth';
import {useTranslation} from 'react-i18next';

export default function Verification({navigation}: ChooseDocumentsProps) {
  const dispatch = useDispatch();
  const {country_id} = useSelector(selectUser) as any;
  const {t} = useTranslation();

  const [country, setCountry] = useState({} as any);
  const [isVisibleReject, setVisibleReject] = useState(true);

  const onPressRepeat = () => setVisibleReject(false);

  const {response, isLoading: loading} = useFetch<VerificationResponse>({
    url: ACCOUNT_VERIFICATION_SETTINGS,
  });

  const translate = {
    PASSPORT: t('verify_user.passport'),
    ID_CARD: t('verify_user.id_card'),
    DRIVERS: t('verify_user.driver_license'),
  };

  const renderItemMenu = (item: DocumentType) => {
    const onSuccess = () => {
      dispatch(
        getUserInfo(() =>
          navigation.navigate('UploadDocuments', {
            document_type_id: item.id,
          }),
        ),
      );
    };
    const onPress = () => {
      dispatch(
        onVerificationCreate(
          {document_type_id: item.id, country_id: country?.id},
          onSuccess,
        ),
      );
    };

    return (
      <ContainerItem
        key={item.id.toString()}
        disabled={!country?.id}
        onPress={onPress}>
        <Row justifyContent="space-between">
          <IconGradient
            name={item.code?.toLocaleLowerCase()}
            containerStyle={styles.iconContainerStyle}
          />

          <View style={styles.centerContainerStyle}>
            <Text type="t4">{translate[item.code]}</Text>
          </View>
          <Icon name="arrow-right" size={20} />
        </Row>
      </ContainerItem>
    );
  };

  return (
    <SafeContainer loading={loading}>
      {response?.status.status === 'process' ? (
        <ContainerItem containerStyle={styles.mainContainerStyle}>
          <Text type="t3" textAlign="center">
            {t('verify_user.modal_success_title')}
          </Text>

          <Text
            type="textMiddle"
            textAlign="center"
            style={styles.subtitleStyle}>
            {t('verify_user.modal_success_desc')}
          </Text>
        </ContainerItem>
      ) : response?.status.status === 'rejected' && isVisibleReject ? (
        <ContainerItem containerStyle={styles.mainContainerStyle}>
          <Text type="t3" textAlign="center">
            {t('verify_user.m_modal_error_title')}
          </Text>

          <Text
            type="textMiddle"
            textAlign="center"
            style={styles.subtitleStyle}>
            {t('verify_user.m_modal_error_desc')}
          </Text>

          <Text
            type="btnMini"
            textAlign="center"
            style={styles.rejectMessageStyle}>
            {response.status.comment}
          </Text>

          <ButtonGradient title={t('common.repeat')} onPress={onPressRepeat} />
        </ContainerItem>
      ) : (
        <>
          <Text style={styles.titleStyle} type="btnSmall">
            {t('verify_user.modal_country_desc')}
          </Text>

          <InputCountry
            showLabel={false}
            onChange={setCountry}
            countryId={country_id}
          />
          {country?.id && (
            <>
              <Text style={styles.titleStyle} type="btnSmall">
                {t('verify_user.modal_method_desc')}
              </Text>
              {response?.documents.map(renderItemMenu)}
            </>
          )}
        </>
      )}
    </SafeContainer>
  );
}
