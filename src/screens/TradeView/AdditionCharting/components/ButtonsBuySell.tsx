import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Row from '@components/containers/Row';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Buttons buy and sell
 */
const ButtonsBuySell = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const greenGradient = EStyleSheet.value('$greenGradient');
  const redGradient = EStyleSheet.value('$regGradient');
  const pressed = EStyleSheet.value('$darkGradient');

  const onPress = (action: string) => {
    navigation.navigate('TradeView', {screen: 'TradeView', typeAction: action});
  };

  return (
    <Row justifyContent="space-between">
      <ButtonGradient
        onPress={() => onPress('buy')}
        title={t('common.buy')}
        gradientColors={greenGradient}
        gradientColorsPressed={pressed}
        buttonContainerStyle={styles.buttonContainerStyle}
        containerStyle={[styles.containerStyle, styles.marginRight]}
      />
      <ButtonGradient
        onPress={() => onPress('sell')}
        title={t('create_order.submit_sell')}
        gradientColors={redGradient}
        gradientColorsPressed={pressed}
        buttonContainerStyle={styles.buttonContainerStyle}
        containerStyle={[styles.containerStyle, styles.marginLeft]}
      />
    </Row>
  );
};

const styles = EStyleSheet.create({
  buttonContainerStyle: {
    height: 40,
    padding: 0,
  },
  marginLeft: {
    marginLeft: 5,
  },
  marginRight: {
    marginRight: 5,
  },
  containerStyle: {
    flex: 1,
    marginVertical: 10,
  },
});

export default ButtonsBuySell;
