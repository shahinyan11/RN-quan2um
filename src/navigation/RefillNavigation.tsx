import React, {useState, useCallback, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';

import PickerCurrency from '@components/pickers/PickerCurrency';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';

import Refill from '@screens/Refill';
import RefillFiat from '@screens/Refill/Fiat';
import RefillConfirmFiat from '@screens/Refill/Fiat/ConfirmRefill';

import {scaledSize} from '@utils/scaledSize';
import {getRefillWallet} from '@store/account';
import {Currency} from '@store/account/types';
import {getUserInfo, selectUser} from '@store/auth';
import {stylesGlobal} from '@constants/globalStyles';

import {RefillFiatOptions, RefillFiatMainOptions} from './config';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '$darkBackground',
  },
  btnRightContainer: {
    marginRight: scaledSize(16),
  },
  btnRightTitleStyle: {
    color: '$primaryMain',
  },
  loaderContainerStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  subtitleStyle: {
    marginVertical: scaledSize(20),
  },
});

const Stack = createStackNavigator();

const StackFiat = createStackNavigator();

function RefillFiatNavigation() {
  return (
    <StackFiat.Navigator screenOptions={RefillFiatOptions}>
      <StackFiat.Screen name="RefillFiat" component={RefillFiat} />
      <StackFiat.Screen
        name="RefillConfirmFiat"
        component={RefillConfirmFiat}
      />
    </StackFiat.Navigator>
  );
}

export default function RefillNavigation({
  route,
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {is_verified} = useSelector(selectUser);
  const [selectedWallet, setSelectedWallet] = useState(
    undefined as undefined | Currency,
  );

  const params = route.params;

  const onSubmit = () => {
    navigation.navigate('VerificationProfile');
  };

  useEffect(() => {
    if (selectedWallet?.is_fiat && !is_verified) {
      dispatch(getUserInfo());
      return;
    }
    if (selectedWallet || params?.currencyId) {
      let currencyId = selectedWallet?.id || params?.currencyId;
      dispatch(getRefillWallet({id: currencyId}));
    }
    if (selectedWallet?.id) {
      if (selectedWallet.is_fiat && is_verified) {
        navigation.navigate('RefillFiat');
      } else if (!selectedWallet.is_fiat) {
        navigation.navigate('RefillCrypto');
      }
    }
  }, [selectedWallet, params, is_verified]);

  const HeaderRight = useCallback(() => {
    const onPress = () => {
      navigation.navigate('History', {
        screen: 'HistoryPutIn',
        params: {
          currencyId: selectedWallet?.id,
        },
      });
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.btnRightContainer}>
        <Text type="textRegular" style={styles.btnRightTitleStyle}>
          {t('common.m_history')}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedWallet, navigation]);

  React.useLayoutEffect(() => {
    if (selectedWallet) {
      navigation.setOptions({
        headerRight: HeaderRight,
      });
    }
  }, [navigation, HeaderRight, selectedWallet]);

  if (!selectedWallet) {
    return (
      <View style={styles.containerStyle}>
        <PickerCurrency
          initCurrencyId={params?.currencyId}
          value={selectedWallet}
          onPress={setSelectedWallet}
        />
      </View>
    );
  }

  return (
    <View style={styles.containerStyle}>
      <PickerCurrency
        initCurrencyId={params?.currencyId}
        value={selectedWallet}
        onPress={setSelectedWallet}
      />
      {selectedWallet?.is_fiat && !is_verified ? (
        <View style={stylesGlobal.emptyContainerStyle}>
          <Text type="t5" textAlign="center">
            {t('verify_user.m_identity')}
          </Text>
          <Text
            type="description"
            style={styles.subtitleStyle}
            textAlign="center">
            {t('verify_user.m_identity_description', {
              name: selectedWallet?.name,
            })}
          </Text>
          <ButtonGradient
            title={t('verify_user.m_identity')}
            onPress={onSubmit}
          />
        </View>
      ) : (
        <Stack.Navigator screenOptions={RefillFiatMainOptions}>
          <Stack.Screen name="RefillCrypto" component={Refill} />
          <Stack.Screen name="RefillFiat" component={RefillFiatNavigation} />
        </Stack.Navigator>
      )}
    </View>
  );
}
