import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {onLogout} from '@store/auth';
import ButtonLink from '../ButtonLink';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onPressLogout = useCallback(() => {
    dispatch(onLogout());
  }, [dispatch]);

  return <ButtonLink title={t('auth.logout')} onPress={onPressLogout} />;
};

export default LogoutButton;
