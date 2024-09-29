import React from 'react';
import Input from '@components/inputs/Input';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Forms for switch to business account
 * @param {object} form
 * @param {function} onChange
 */
const Forms = ({form, onChange}: any) => {
  const {t} = useTranslation();

  return (
    <>
      <Input
        label={t('input.label_country')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={128}
        value={form.country}
        onChangeText={text => onChange('country', text)}
      />
      <Input
        label={t('input.label_city')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={128}
        value={form.city}
        onChangeText={text => onChange('city', text)}
      />
      <Input
        label={t('common.address')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={256}
        value={form.address}
        onChangeText={text => onChange('address', text)}
      />
      <Input
        label={t('input.label_company')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={128}
        value={form.company}
        onChangeText={text => onChange('company', text)}
      />
      <Input
        label={t('input.label_vat')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={128}
        value={form.vat}
        onChangeText={text => onChange('vat', text)}
      />
      <Input
        label={t('input.label_pos_code')}
        placeholder={t('input.place_start_type')}
        containerStyle={styles.inputContainer}
        maxLength={16}
        keyboardType="number-pad"
        value={form.postal_code}
        onChangeText={text => onChange('postal_code', text)}
      />
    </>
  );
};

const styles = EStyleSheet.create({
  inputContainer: {
    marginTop: 15,
  },
});

export default Forms;
