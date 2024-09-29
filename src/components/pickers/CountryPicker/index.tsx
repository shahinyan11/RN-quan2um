import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, Pressable, StyleProp} from 'react-native';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import ModalFlag from '@components/modals/ModalFlag';
import {getFlag, ICountry} from '@constants/countries';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries} from '@store/app';
import {useTranslation} from 'react-i18next';
import {ICountryPickerCountry} from '@components/inputs/InputCountry';

interface ICountryPicker {
  onChange: (value: ICountry) => void;
  flagStyle?: StyleProp<ImageStyle>;
  showCountryName?: boolean;
  showPhoneCode?: boolean;
  defaultSelectedCountry?: number;
}

const CountryPicker = ({
  flagStyle,
  showCountryName = false,
  showPhoneCode = false,
  onChange,
  defaultSelectedCountry,
}: ICountryPicker) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    {} as ICountryPickerCountry,
  );
  const {countries} = useSelector(state => state.app);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    onChange(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    let _selectedCountry = countries[0];

    if (defaultSelectedCountry) {
      _selectedCountry = countries.find(
        item => item.id === defaultSelectedCountry,
      );
    }
    setSelectedCountry(_selectedCountry);
  }, [countries, defaultSelectedCountry]);

  const onPressFlag = () => {
    onChangeModalVisible();
  };

  const onChangeModalVisible = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressCountry = (item: ICountry) => {
    setSelectedCountry(item);
    onChangeModalVisible();
  };

  return (
    <>
      <Pressable onPress={onPressFlag}>
        <Row containerStyle={styles.containerStyle}>
          <Image
            source={getFlag(selectedCountry?.iso2)}
            style={[styles.flagStyle, flagStyle]}
          />
          {showPhoneCode && (
            <Text type="textMiddle" style={styles.phoneCodeStyle}>
              +{selectedCountry?.dialCode}
            </Text>
          )}
          <Icon name="arrow-down" />
          {showCountryName && (
            <Text style={styles.nameStyle}>
              {selectedCountry?.name || t('verify_user.modal_country_desc')}
            </Text>
          )}
        </Row>
      </Pressable>
      <ModalFlag
        isVisible={isModalVisible}
        onClose={onChangeModalVisible}
        countries={countries}
        onPressCountry={onPressCountry}
      />
    </>
  );
};

export default CountryPicker;
