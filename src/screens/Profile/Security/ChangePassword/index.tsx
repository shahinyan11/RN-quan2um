import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import ButtonGradient from '@components/buttons/ButtonGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Text from '@components/textes/Text';

import st from './styles';
import {selectLoading} from '@store/account/selectors';
import PasswordField from '@components/formFields/PasswordField';
import {FormikProvider, useFormik} from 'formik';
import changePasswordSchema from '@validations/changePassword';
import {onChangePassword} from '@store/account';

export default function ChangePassword() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const onSubmit = (values: any) => {
    delete values.repeat_password;

    console.log(55555, values);
    dispatch(onChangePassword(values));
  };

  const formik = useFormik({
    validationSchema: changePasswordSchema,
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      new_password: '',
      repeat_password: '',
    },
    onSubmit,
  });

  return (
    <KeyboardListener>
      <SafeContainer loading={loading} containerStyle={st.container}>
        <FormikProvider value={formik}>
          <View>
            <PasswordField
              name={'current_password'}
              label={t('input.уnter_current_password')}
              labelStyle={st.inputLabel}
              inputContainerStyle={st.mb50}
            />

            <Text style={[st.smallText, st.textDark]}>
              {t('change_pass.new_password_must_be_different')}
            </Text>

            <PasswordField
              name={'new_password'}
              label={t('input.уnter_current_password')}
              labelStyle={st.inputLabel}
              inputContainerStyle={st.mb30}
            />

            <View style={st.mb50}>
              <Text style={[st.smallText, st.mb10]}>Требования к паролю:</Text>
              <View style={[st.textRow, st.mb10]}>
                <Text style={[st.dote, st.smallText]}>&#8226;</Text>
                <Text style={st.smallText}>Не менее 8 символов</Text>
              </View>
              <View style={st.textRow}>
                <Text style={[st.dote, st.smallText]}>&#8226;</Text>
                <Text style={st.smallText}>
                  Используйте цифры и заглавные буквы для дополнительноф защиты
                </Text>
              </View>
            </View>

            <PasswordField
              name={'repeat_password'}
              label={t('input.уnter_current_password')}
              labelStyle={st.inputLabel}
            />

            {/*<InputPassword*/}
            {/*  label={t('input.label_password')}*/}
            {/*  placeholder={t('input.label_password')}*/}
            {/*  value={oldPassword}*/}
            {/*  onChangeText={setOldPassword}*/}
            {/*  containerStyle={st.inpContainerStyle}*/}
            {/*/>*/}
          </View>

          <ButtonGradient
            // @ts-ignore
            onPress={formik.handleSubmit}
            buttonContainerStyle={st.mb50}
            disabled={!formik.isValid}
            title={t('common.confirm')}
            disableType={'opacity'}
            gradientColors={['#00FF75', '#0075FF']}
          />
        </FormikProvider>
      </SafeContainer>
    </KeyboardListener>
  );
}
