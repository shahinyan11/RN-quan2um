import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {FormikProvider, useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

import EStyleSheet from 'react-native-extended-stylesheet';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import validationSchema from '@validations/createFund';
import InputText from '@components/inputs/InputText';
import UploadImage from '@components/UploadImage';
import {createFounds} from '@store/charity';
import st from './styles';
import InputSelect from '@components/inputs/InputSelect';
import {selectSelectedFundType} from '@store/charity/selectors';

export default function ApplicationRegistration() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const height = useHeaderHeight();
  const blackTextLight = EStyleSheet.value('$blackTextLight');
  const selectedFundType = useSelector(selectSelectedFundType);

  useEffect(() => {
    formik.setFieldValue('type_id', selectedFundType?.id);
  }, [selectedFundType]);

  const onSubmit = values => {
    dispatch(createFounds(values));
  };

  const formik = useFormik({
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      name: '',
      annotation: '',
      description: '',
      about: '',
      region: '',
      type_id: '',
      wallet: '',
      uri: '',
      odnoklassniki: '',
      vkontakte: '',
      facebook: '',
      instagram: '',
      logo: {uri: '' || undefined},
      cover: {uri: '' || undefined},
      images: [],
    },
  });

  const selectLogo = (imageData: any) => {
    formik.setFieldValue('logo', imageData);
  };

  const selectCover = (imageData: any) => {
    formik.setFieldValue('cover', imageData);
  };

  const selectPhoto = (imageData: any) => {
    const images = formik.values.images;
    formik.setFieldValue('images', [...images, imageData]);
  };

  const onDeletePhoto = (id: string) => {
    const images = formik.values.images;
    formik.setFieldValue(
      'images',
      [...images].filter(item => item.id !== id),
    );
  };

  const buttonDisabled = useMemo(() => !formik.isValid, [formik.isValid]);

  return (
    <View style={{flex: 1, paddingBottom: 34, paddingHorizontal: 20}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={st.title}>{t('charity.fund_info')}</Text>
            <FormikProvider value={formik}>
              <InputText
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                label={`${t('charity.label_fund_name')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_fund_name')}
              />
              <InputText
                value={formik.values.annotation}
                onChangeText={formik.handleChange('annotation')}
                label={`${t('input.label_title')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.start_type')}
              />
              <InputText
                value={formik.values.description}
                onChangeText={formik.handleChange('description')}
                label={`${t('charity.label_whom_do_you_help')}* ${t(
                  'charity.maximum_characters',
                  {count: 200},
                )}`}
                labelStyle={st.label}
                inputContainerStyle={st.textareaContainer}
                inputStyle={st.textarea}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_text')}
                multiline={true}
                numberOfLines={6}
              />
              <InputText
                value={formik.values.about}
                onChangeText={formik.handleChange('about')}
                label={`${t('charity.label_about_organization')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.textareaContainer}
                inputStyle={st.textarea}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_text')}
                multiline={true}
                numberOfLines={6}
              />
              <InputText
                value={formik.values.region}
                onChangeText={formik.handleChange('region')}
                label={`${t('charity.label_which_regions_help')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.start_type')}
              />
              <InputSelect
                onPress={() => navigation.navigate('FundDirection')}
                value={selectedFundType?.name}
                labelStyle={st.label}
                label={`${t('charity.label_fund_direction')}*`}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                iconColor={blackTextLight}
              />
              {/*<InputText*/}
              {/*  value={formik.values.type_id}*/}
              {/*  onChangeText={formik.handleChange('type_id')}*/}
              {/*  label={`${t('charity.label_fund_direction')}*`}*/}
              {/*  labelStyle={st.label}*/}
              {/*  inputContainerStyle={st.inputContainer}*/}
              {/*  inputStyle={st.input}*/}
              {/*  placeholderColor={blackTextLight}*/}
              {/*  placeholder={t('charity.start_type')}*/}
              {/*/>*/}
              <InputText
                value={formik.values.wallet}
                onChangeText={formik.handleChange('wallet')}
                label={`${t('charity.wallet_address_from_app')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('common.m_wallet-address')}
              />
              <Text style={st.greenText}>{t('charity.how_get_address')}</Text>
              <InputText
                value={formik.values.uri}
                onChangeText={formik.handleChange('uri')}
                label={`${t('charity.label_your_fund_website')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_site_link')}
              />
              <InputText
                value={formik.values.odnoklassniki}
                onChangeText={formik.handleChange('odnoklassniki')}
                label={`${t('charity.label_link_to_ok')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_site_link')}
              />
              <InputText
                value={formik.values.vkontakte}
                onChangeText={formik.handleChange('vkontakte')}
                label={`${t('charity.label_link_to_vk')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_site_link')}
              />
              <InputText
                value={formik.values.facebook}
                onChangeText={formik.handleChange('facebook')}
                label={`${t('charity.label_link_to_fb')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_site_link')}
              />
              <InputText
                value={formik.values.instagram}
                onChangeText={formik.handleChange('instagram')}
                label={`${t('charity.label_link_to_inst')}*`}
                labelStyle={st.label}
                inputContainerStyle={st.inputContainer}
                inputStyle={st.input}
                placeholderColor={blackTextLight}
                placeholder={t('charity.enter_site_link')}
              />
              <View style={st.uploadsContainer}>
                <UploadImage
                  image={formik.values.logo}
                  title={t('charity.found_logo')}
                  onSelect={selectLogo}
                  buttonText={t('common.download_logo')}
                  containerStyle={{marginBottom: 40}}
                />
                <UploadImage
                  image={formik.values.cover}
                  title={t('charity.application_cover')}
                  onSelect={selectCover}
                  containerStyle={{marginBottom: 40}}
                />
                <UploadImage
                  imagesList={formik.values.images}
                  title={t('charity.attach_photos')}
                  onSelect={selectPhoto}
                  onDelete={onDeletePhoto}
                  multiple={true}
                />
              </View>
              <Text style={[st.lightText, {marginBottom: 130}]}>
                * {t('charity.owned_by_Meta')}
              </Text>
            </FormikProvider>
          </ScrollView>
        </View>
        <TouchableOpacity
          disabled={buttonDisabled}
          // @ts-ignore
          onPress={formik?.handleSubmit}
          style={buttonDisabled ? st.buttonDisabled : st.button}>
          <Text style={buttonDisabled ? st.buttonDisabledText : st.buttonText}>
            {t('charity.register_fund')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
