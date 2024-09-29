import React from 'react';
import {StyleProp, View} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
import Text from '@components/textes/Text';
import {ICountry} from '@constants/countries';

import {scaledSize} from '@utils/scaledSize';
import {textMiddle} from '@constants/globalStyles';
import {useTranslation} from 'react-i18next';
import CountryPicker from '@components/pickers/CountryPicker';

const styles = EStyleSheet.create({
  flagStyle: {
    width: scaledSize(36),
    height: scaledSize(20),
  },
  containerStyle: {
    marginVertical: scaledSize(6),
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '$white10',
    height: scaledSize(50),
    justifyContent: 'center',
    paddingHorizontal: scaledSize(16),
    borderRadius: scaledSize(8),
  },
  inputStyle: {
    ...textMiddle,
    color: 'white',
    flex: 1,
  },
  placeholderStyle: {
    ...textMiddle,
    color: '$white25',
    flex: 1,
  },
  labelStyle: {
    textTransform: 'uppercase',
    marginBottom: 4,
  },
});

export type ICountryPickerCountry = ICountry;

interface ICountryPicker {
  onChange: (value: ICountry) => void;
  containerStyle?: StyleProp<ViewStyle>;
  countryId?: number;
  showLabel?: boolean;
}

const InputCountry = ({
  showLabel = true,
  onChange,
  containerStyle,
  countryId,
}: ICountryPicker) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {showLabel && (
        <Text type="tTiny" style={styles.labelStyle}>
          {t('verify_user.modal_country_desc')}
        </Text>
      )}
      <View style={styles.inputContainerStyle}>
        <CountryPicker
          onChange={onChange}
          flagStyle={styles.flagStyle}
          defaultSelectedCountry={countryId}
          showCountryName
        />
      </View>
    </View>
  );
};

export default InputCountry;
