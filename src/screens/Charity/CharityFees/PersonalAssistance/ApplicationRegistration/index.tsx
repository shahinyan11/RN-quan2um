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
import {createProposal} from '@store/charity';
import {MONEY_COLLECTION_IDS} from '@constants/index';
import {showModal} from '@store/modal';
import validationSchema from '@validations/createProposalHelp';

export default function ApplicationRegistration() {
  const blackTextLight = EStyleSheet.value('$blackTextLight');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const height = useHeaderHeight();

  const onSubmit = values => {
    dispatch(
      createProposal({
        money_collection_type: MONEY_COLLECTION_IDS.PERSONAL,
        ...values,
      }),
    );
  };

  const formik = useFormik({
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      description: '',
      wallet: '',
      image: {uri: undefined},
    },
  });

  const selectLogo = (imageData: any) => {
    formik.setFieldValue('image', imageData);
  };

  const handleGetAddress = () => {
    dispatch(
      showModal({
        modalType: 'APPLICATION_INSTRUCTION',
      }),
    );
  };

  const buttonDisabled = useMemo(() => !formik.isValid, [formik.isValid]);

  return (
    <View style={st.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={st.title}>
              {t('charity.application_personal_assistance')}
            </Text>
            <Text style={st.desc}>
              {t('charity.about_yourself_and_situation')}
            </Text>
            <FormikProvider value={formik}>
              <InputText
                value={formik.values.description}
                label={t('charity.describe_your_problem')}
                labelStyle={st.label}
                blurMode={true}
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
                label={`${t('charity.wallet_address_from_app')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                blurMode={true}
                placeholderColor={blackTextLight}
                placeholder={t('common.m_wallet-address')}
                onChangeText={formik.handleChange('wallet')}
              />

              <TouchableOpacity
                onPress={handleGetAddress}
                style={{marginTop: 4, marginBottom: 40}}>
                <Text style={st.greenText}>{t('charity.how_get_address')}</Text>
              </TouchableOpacity>
              <Text style={st.desc}>
                {t('charity.if_submit_personal_assistance')}
              </Text>

              <View style={st.uploadsContainer}>
                <UploadImage
                  image={formik.values.image}
                  title={t('common.photos')}
                  onSelect={selectLogo}
                  containerStyle={{marginBottom: 20}}
                />
              </View>
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
