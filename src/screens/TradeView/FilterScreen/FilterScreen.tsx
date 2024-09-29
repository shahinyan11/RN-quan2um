import React, {useEffect, useLayoutEffect} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFilterParams,
  selectFilterOrder,
  selectFilterParams,
  selectLoading,
  setFilterOrder,
  clearFilterOrder,
} from '@store/tradeview';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import ButtonGradient from '@components/buttons/ButtonGradient';
import ButtonLink from '@components/buttons/ButtonLink';

/**
 * Filter screen for orders history
 */
const FilterScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const filterParams = useSelector(selectFilterParams);
  const filterOrder = useSelector(selectFilterOrder);
  const loading = useSelector(selectLoading);

  const activeColor = EStyleSheet.value('$primaryMain');
  const inactiveColor = EStyleSheet.value('$white5');

  const onPressBack = () => {
    navigation.goBack();
    dispatch(setFilterOrder({value: false, key: 'apply'}));
  };

  const ButtonLeft = (props: any) => {
    const {canGoBack} = props;
    const white50 = EStyleSheet.value('$white50');
    return (
      canGoBack && (
        <Pressable onPress={onPressBack}>
          <View style={styles.containerStyle}>
            <Icon name="arrow-left" color={white50} size={20} />
          </View>
        </Pressable>
      )
    );
  };

  const ButtonRightClear = () => {
    const onPressClear = () => {
      dispatch(
        clearFilterOrder({
          apply: false,
          main_currency: filterParams.currencies[0],
          type: filterParams.types[0],
          side: filterParams.sides[0],
        }),
      );
    };

    return (
      <ButtonLink
        title={t('common.m_reset')}
        onPress={onPressClear}
        containerStyle={styles.headerRightContainerStyle}
      />
    );
  };

  useEffect(() => {
    if (!filterOrder?.main_currency) {
      dispatch(getFilterParams());
    }
  }, [filterOrder]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ButtonLeft,
      headerRight: ButtonRightClear,
    });
  });

  const onSetFilter = (value, key) => {
    dispatch(setFilterOrder({value, key}));
  };

  const onPress = () => {
    navigation.navigate('CurrencyFilterScreen', {callBackAction: onSetFilter});
  };

  const handleConfirm = () => {
    dispatch(setFilterOrder({value: true, key: 'apply'}));
    navigation.goBack();
  };

  if (!filterOrder) {
    return null;
  }

  return (
    <SafeContainer loading={loading} containerStyle={styles.container}>
      <View>
        <Text type="t6">{t('common.currency')}</Text>
        <TouchableOpacity
          style={styles.pressable}
          onPress={onPress}
          activeOpacity={0.6}>
          <Text fontWeight="bold" textAlign="center">
            {filterOrder.main_currency?.name}
          </Text>
          <Icon name="arrow-right" />
        </TouchableOpacity>
        <Text type="t6">{t('common.type')}</Text>
        <Row justifyContent="space-between" containerStyle={styles.buttonBlock}>
          {filterParams?.types.map((item: any) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.button,
                {
                  backgroundColor:
                    filterOrder.type?.name === item.name
                      ? activeColor
                      : inactiveColor,
                },
              ]}
              activeOpacity={0.6}
              onPress={() => onSetFilter(item, 'type')}>
              <Text type="t6" textAlign="center">
                {item.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </Row>
        <Text type="t6">{t('common.side')}</Text>
        <Row justifyContent="space-between" containerStyle={styles.buttonBlock}>
          {filterParams?.sides.map((item: any) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.button,
                {
                  backgroundColor:
                    filterOrder.side?.name === item.name
                      ? activeColor
                      : inactiveColor,
                },
              ]}
              activeOpacity={0.6}
              onPress={() => onSetFilter(item, 'side')}>
              <Text type="t6" textAlign="center">
                {item.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </Row>
      </View>
      <ButtonGradient title={t('common.confirm')} onPress={handleConfirm} />
    </SafeContainer>
  );
};

export default FilterScreen;
