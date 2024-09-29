import React, {useRef} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import st from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '@store/modal';
import {Close} from '@assets/svgs';
import {selectUser} from '@store/auth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {onResendWithdrawalCode} from '@store/account';
import Clipboard from '@react-native-community/clipboard';
import {FormikProvider, useFormik} from 'formik';
import tfaValidation from '@validations/tfaValidation';
import TextField from '@components/formFields/TextField';

export type IdentificationCheckProps = {
  showTfa?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  onConfirm: ({tfa_code, email_code, phone_code}) => void;
};

export default function IdentificationCheck({
  showTfa,
  showEmail,
  showPhone,
  onConfirm,
}: IdentificationCheckProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const user = useSelector(selectUser);
  const validation = useRef<any>(
    tfaValidation({
      isTfaRequired: showTfa,
      isEmailRequired: showEmail,
      isPhoneRequired: showPhone,
    }),
  );

  const onSubmit = values => {
    onConfirm(values);

    closeModal();
  };

  const formik = useFormik({
    onSubmit,
    validationSchema: validation.current,
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      email_code: '',
      phone_code: '',
      tfa_code: '',
    },
  });

  const sendToEmail = () => {
    dispatch(onResendWithdrawalCode());
  };

  const onInsert = async () => {
    const value = await Clipboard.getString();
    formik.setFieldValue('tfa_code', value);
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <ScrollView
      style={[st.container, {paddingTop: insets.top}]}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={st.sheet}>
        <TouchableOpacity onPress={closeModal} style={st.close}>
          <Close />
        </TouchableOpacity>
        <Text style={st.title}>{t('account.identification_check')}</Text>
        <FormikProvider value={formik}>
          <View style={st.content}>
            {showEmail && (
              <TextField
                name="email_code"
                labelStyle={st.labelStyle}
                selectionColor={'#00D89D'}
                inputContainerStyle={st.inputContainer}
                label={t('account.send_code_to_email', {
                  email: user?.email_hidden,
                })}
                addAfter={
                  <TouchableOpacity onPress={sendToEmail}>
                    <Text style={st.greenText}>{t('account.get_code')}</Text>
                  </TouchableOpacity>
                }
              />
            )}
            {showPhone && (
              <TextField
                name="phone_code"
                labelStyle={st.labelStyle}
                inputContainerStyle={st.inputContainer}
                label={'Отправить код подтверждения на +7 (999) ***-**99'}
                selectionColor={'#00D89D'}
                addAfter={
                  <Text style={st.whiteText}>{t('account.get_code')}</Text>
                }
              />
            )}

            {showTfa && (
              <TextField
                name="tfa_code"
                labelStyle={st.labelStyle}
                inputContainerStyle={st.inputContainer}
                label={t('account.google_authenticator')}
                selectionColor={'#00D89D'}
                keyboardType="numeric"
                addAfter={
                  <Text onPress={onInsert} style={st.greenText}>
                    {t('common.insert')}
                  </Text>
                }
              />
            )}

            <ButtonGradient
              containerStyle={st.buttonContainer}
              buttonContainerStyle={st.button}
              disabled={!formik.isValid}
              disableType={'opacity'}
              title={t('common.confirm')}
              onPress={formik.handleSubmit}
              gradientColors={['#00FF75', '#0075FF']}
            />
            <Text style={st.underlineText}>
              {t('account.problems_with_verification')}?
            </Text>
          </View>
        </FormikProvider>
      </View>
    </ScrollView>
  );
}
