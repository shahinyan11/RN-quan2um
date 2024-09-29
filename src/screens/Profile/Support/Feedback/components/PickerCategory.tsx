import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import styles from '@screens/Profile/Support/Feedback/styles';
import Text from '@components/textes/Text';
import Picker from '@components/pickers/Picker';

/**
 * Picker for categories
 * @param list
 * @param value
 * @param onPress
 */
const PickerCategory = ({list, value, onPress}: any) => {
  const {t} = useTranslation();
  return (
    <View style={styles.pickerContainerStyle}>
      <Text style={styles.labelStyle}>{t('common.categories')}</Text>
      <View style={styles.pickerInputContainerStyle}>
        <Picker
          value={value}
          list={list}
          labelField={'name'}
          keyField={'id'}
          placeholder={t('input.place_select_category')}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default memo(PickerCategory);
