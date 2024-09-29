import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import EmptyList from '@components/containers/EmptyList';
import Icon from '@components/icons/Icon';

import {ILanguage} from '@store/app/types';

import styles from './styles';

import {selectLanguage, selectLanguages, setLanguage} from '@store/app';
import {storeData} from '@utils/asyncStorage';

export default function Language() {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const primaryColor = EStyleSheet.value('$primaryMain');

  const languages = useSelector(selectLanguages);
  const language = useSelector(selectLanguage);

  const renderLanguage = ({item}: {item: ILanguage}) => {
    const isActive = item.id === language.id;

    const onSetLanguage = () => {
      storeData('@app_language', item.locale);
      i18n.changeLanguage(item.locale);
      dispatch(setLanguage(item));
    };

    return (
      <TouchableOpacity onPress={onSetLanguage}>
        <Row
          justifyContent="space-between"
          containerStyle={[
            styles.languageContainerStyle,
            isActive && styles.activeLanguageContainerStyle,
          ]}>
          <Text type="description">{item.title}</Text>
          {isActive && <Icon name="check" color={primaryColor} size={16} />}
        </Row>
      </TouchableOpacity>
    );
  };
  return (
    <SafeContainer>
      <FlatList
        data={languages}
        renderItem={renderLanguage}
        ListEmptyComponent={EmptyList}
      />
    </SafeContainer>
  );
}
