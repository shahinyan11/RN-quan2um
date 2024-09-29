import React, {useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {FormikProvider, useFormik} from 'formik';
import InputText from '@components/inputs/InputText';
import EStyleSheet from 'react-native-extended-stylesheet';
import UploadImage from '@components/UploadImage';
import {useHeaderHeight} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import UploadVideo from '@components/UploadVideo';
import {createProposal} from '@store/charity';
import {MONEY_COLLECTION_IDS} from '@constants/index';
import validationSchema from '@validations/moneyCollectionZakat';
import {showModal} from '@store/modal';

export default function ApplicationRegistration() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const height = useHeaderHeight();
  const blackTextLight = EStyleSheet.value('$blackTextLight');

  const onSubmit = values => {
    dispatch(
      createProposal({
        money_collection_id: MONEY_COLLECTION_IDS.ZAKAT,
        ...values,
      }),
    );
  };

  const handleGetAddress = () => {
    dispatch(
      showModal({
        modalType: 'APPLICATION_INSTRUCTION',
      }),
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: '',
      wallet: '',
      image: {uri: undefined},
      video: {uri: undefined},
    },
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  const selectLogo = (imageData: any) => {
    formik.setFieldValue('image', imageData);
  };

  const selectVideo = (videoData: any) => {
    formik.setFieldValue('video', videoData);
  };

  const buttonDisabled = useMemo(() => !formik.isValid, [formik.isValid]);

  return (
    <View style={st.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 114}}>
            <Text style={st.title}>{t('charity.application_for_zakat')}</Text>
            <Text style={st.desc}>
              {t('charity.about_yourself_and_situation')}
            </Text>
            <FormikProvider value={formik}>
              <InputText
                value={formik.values.description}
                blurMode={true}
                label={t('charity.describe_your_problem')}
                labelStyle={st.label}
                inputContainerStyle={st.textareaContainer}
                inputStyle={st.textarea}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_text')}
                multiline={true}
                numberOfLines={6}
                onChangeText={formik.handleChange('description')}
              />

              <InputText
                value={formik.values.wallet}
                blurMode={true}
                label={`${t('charity.wallet_address_from_app')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_wallet_address')}
                onChangeText={formik.handleChange('wallet')}
              />

              <TouchableOpacity
                onPress={handleGetAddress}
                style={{marginTop: 4, marginBottom: 40}}>
                <Text style={st.greenText}>{t('charity.how_get_address')}</Text>
              </TouchableOpacity>
              <Text style={st.title}>{t('charity.attach_evidence')}</Text>
              <Text style={st.desc}>
                {t('charity.if_submit_personal_assistance')}
              </Text>

              <UploadImage
                image={formik.values.image}
                title={t('common.photos')}
                onSelect={selectLogo}
                containerStyle={{marginBottom: 12}}
              />
              <UploadVideo
                video={formik.values.video}
                title={t('charity.video_materials')}
                onSelect={selectVideo}
              />
            </FormikProvider>
          </ScrollView>
        </View>
        <Pressable
          // @ts-ignore
          onPress={formik.handleSubmit}
          disabled={buttonDisabled}
          style={buttonDisabled ? st.buttonDisabled : st.button}>
          <Text style={buttonDisabled ? st.buttonDisabledText : st.buttonText}>
            {t('common.send_request')}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
