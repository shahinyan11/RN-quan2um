import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import Text from '@components/textes/Text';
import EmptyList from '@components/containers/EmptyList';

import {GTFAOneTimeCodesProps} from '@navigation/config/types';
import {getUserInfo} from '@store/auth/actions';

import styles from './styles';
import {navigationRef} from '@navigation/index';

export default function GTFAOneTimeCodes({route}: GTFAOneTimeCodesProps) {
  const {reserve_codes} = route.params;
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(getUserInfo());
    navigationRef.current?.navigate('Main');
  };

  const renderItem = ({item}: {item: string}) => (
    <View style={styles.itemContainerStyle}>
      <Text type="textRegular">{item}</Text>
    </View>
  );

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      <Text textAlign="center" style={styles.titleStyle}>
        {t('tfa_on_off.access_codes')}
      </Text>
      <Text type="description" style={styles.hintStyle}>
        {t('tfa_on_off.access_codes_info')}
      </Text>
      <FlatList
        numColumns={2}
        data={reserve_codes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyList}
      />

      <Button title={t('common.next_step')} onPress={onSubmit} />
    </SafeContainer>
  );
}
