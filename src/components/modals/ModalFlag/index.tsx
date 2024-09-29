import React, {memo, useEffect, useState} from 'react';

import {
  Modal,
  ModalProps,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import InputSearch from '@components/inputs/InputSearch';
import {getFlag, ICountry} from '@constants/countries';
import Divider from '@components/Divider';
import EmptyList from '@components/containers/EmptyList';
import Text from '@components/textes/Text';

import styles from './styles';
import {customSearch} from '@utils/index';

interface IModalFlagProps extends ModalProps {
  isVisible: boolean;
  onClose: () => void;
  countries: ICountry[];
  onPressCountry: (item: ICountry) => void;
  withPhone?: boolean;
}

const ModalFlag = ({
  isVisible,
  onClose,
  countries = [],
  onPressCountry,
  withPhone = true,
}: IModalFlagProps) => {
  const white50 = EStyleSheet.value('$white50');
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [fCountries, setFCountries] = useState(
    undefined as undefined | ICountry[],
  );

  useEffect(() => {
    const filteredCountries = countries.filter(
      item =>
        customSearch(item.name, searchQuery) ||
        customSearch(item.dialCode, searchQuery),
    );

    setFCountries(filteredCountries);
  }, [searchQuery, countries]);

  const renderItemCountry = ({item}: {item: ICountry}) => {
    const onPressItem = () => {
      onPressCountry(item);
    };
    return (
      <TouchableOpacity key={item.iso2} onPress={onPressItem}>
        <Row alignItems="center" justifyContent="space-between">
          <Image source={getFlag(item.iso2)} style={styles.flagStyle} />
          <Text
            type="textRegular"
            style={styles.countryNameStyle}
            numberOfLines={1}>
            {item.name}
          </Text>
          {withPhone && (
            <Text type="textRegular" style={styles.phoneCodeStyle}>
              +{item.dialCode}
            </Text>
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal visible={isVisible}>
      <SafeContainer containerStyle={styles.sfContainerStyle}>
        <Row alignItems="center">
          <Icon
            disabled={false}
            name="arrow-left"
            color={white50}
            containerStyle={styles.iconContainerStyle}
            onPress={onClose}
          />
          <InputSearch
            placeholder={t('input.place_enter_country')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.inputContainerStyle}
          />
        </Row>
        <View style={styles.mainContainerStyle}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={fCountries}
            renderItem={renderItemCountry}
            keyExtractor={item => item.iso2}
            contentContainerStyle={styles.flContainerStyle}
            ListEmptyComponent={EmptyList}
            ItemSeparatorComponent={Divider}
          />
        </View>
      </SafeContainer>
    </Modal>
  );
};

export default memo(ModalFlag);
