import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Text from '@components/textes/Text';
import AccountTypeSwitch from './components/AccountTypeSwitch';
import Forms from './components/Forms';
import AttachFileGroup from './components/AttachFileGroup';
import Button from '@components/buttons/Button';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '@store/auth';
import {switchBusinessAccount} from '@store/account';

const initForm = {
  country: '',
  city: '',
  address: '',
  postal_code: '',
  company: '',
  vat: '',
  certificate: null,
  article: null,
};

/**
 * Account type screen
 */
const AccountTypeScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {account_type, is_verified, is_sent_business_req} =
    useSelector(selectUser);
  const [form, setForm] = useState(initForm);
  const [disabled, setDisabled] = useState(true);

  const minCharacters: any = {
    country: 4,
    city: 2,
    address: 5,
    postal_code: 3,
    company: 2,
    vat: 2,
  };

  useEffect(() => {
    const isValid = Object.entries(form).every((item: any) => {
      if (typeof form[item[0]] !== 'object') {
        return minCharacters[item[0]] <= +form[item[0]].length;
      } else {
        return form[item[0]] !== null;
      }
    });

    if (isValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);

  const handleOnChange = useCallback(
    (key: string, value: string) => {
      setForm({...form, [key]: value});
    },
    [form],
  );

  const handleOnSend = async () => {
    try {
      await dispatch(switchBusinessAccount(form));
      setForm(initForm);
      navigation.goBack();
    } catch (err) {
      console.log('handleOnSend error', err.message);
    }
  };
  if (is_sent_business_req && account_type === 1) {
    return (
      <View>
        <Text type="t4" textAlign="center">
          {t('account.m_account-type-message')}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <AccountTypeSwitch />
        {account_type === 1 ? (
          is_verified && (
            <>
              <Text textAlign="center">{t('common.m_switch-business')}</Text>
              <Forms form={form} onChange={handleOnChange} />
              <AttachFileGroup addPhoto={handleOnChange} file={form} />
              <Button
                title={t('common.send')}
                disabled={disabled}
                onPress={handleOnSend}
              />
            </>
          )
        ) : (
          <Text textAlign="center">{t('common.m_switch-personal')}</Text>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AccountTypeScreen;
