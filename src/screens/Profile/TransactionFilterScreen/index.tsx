import React from 'react';
import {View} from 'react-native';

import KeyboardListener from '@components/listeners/KeyboardListener';
import SafeContainer from '@components/containers/SafeContainer';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {showModal} from '@store/modal/actions';
import InputSelect from '@components/inputs/InputSelect';
import {useDispatch, useSelector} from 'react-redux';
import InputText from '@components/inputs/InputText';
import Button from '@components/buttons/Button';
import * as colors from '@constants/colors';
import {clearFilters, setFilters} from '@store/filters';
import Text from '@components/textes/Text';
import st from './styles';
import {useTranslation} from 'react-i18next';
import {getMasterNodesWithRewardHistory} from '@store/masterNodesX10';
import {getTransactionsList} from '@store/exchange';
import moment from 'moment';

export default function TransactionFilterScreen({navigation, route}: any) {
  const {tab} = route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {currency, status, information, time_start, time_end, award, profit} =
    useSelector(store => store.filters);

  const {routes} = navigation.getState();
  const prevScreen = routes[routes.length - 3].name;

  const isFilled = () => {
    return (
      time_end ||
      time_start ||
      currency ||
      status ||
      information ||
      award ||
      profit
    );
  };

  const clear = () => {
    dispatch(clearFilters());
  };

  const handleChange = (input: string, value: any) => {
    dispatch(setFilters({[input]: value}));
  };

  const handleSelectClick = () => {
    dispatch(
      showModal({
        modalType: 'STATUS_SELECT',
      }),
    );
  };

  const renderAfter = () => (
    <Text type={'t4'} style={st.textDark}>
      BTCa
    </Text>
  );

  const handleSubmit = () => {
    switch (prevScreen) {
      case 'ExchangeScreen':
        dispatch(
          getTransactionsList({
            tab,
            filters: {
              time_start: moment(time_start)?.valueOf() / 1000 || null,
              time_end: moment(time_end)?.valueOf() / 1000 || null,
              status,
            },
          }),
        );
        break;
      case 'MasternodesScreen':
        dispatch(getMasterNodesWithRewardHistory());
        break;
      default:
        break;
    }

    navigation.goBack();
  };

  return (
    <SafeContainer>
      <KeyboardListener>
        <View style={st.topContainer}>
          <View style={st.dateContainer}>
            <InputText
              value={time_start}
              containerStyle={st.leftDateInput}
              onChangeText={value => handleChange('time_start', value)}
              placeholder="0000 / 00 / 00"
              label={t('common.date')}
            />
            <InputText
              value={time_end}
              containerStyle={{flex: 0.49}}
              onChangeText={value => handleChange('time_end', value)}
              placeholder="0000 / 00 / 00"
            />
          </View>
          {prevScreen === 'MasternodesScreen' && (
            <>
              <InputText
                placeholder="0"
                label={t('common.profit_from')}
                value={profit}
                containerStyle={st.mb16}
                onChangeText={value => handleChange('profit', value)}
                addAfter={renderAfter()}
              />

              <InputText
                placeholder="0"
                value={award}
                label={t('common.award_from')}
                onChangeText={value => handleChange('award', value)}
                addAfter={renderAfter()}
              />
            </>
          )}
          {prevScreen === 'ExchangeScreen' && (
            <>
              <InputSelect
                // t('common.currency')
                label="Валюта"
                value={currency || 'Все'}
              />
              <InputSelect
                // t('common.status')
                label="Статус"
                value={status || 'Все'}
                onPress={handleSelectClick}
                inputStyle={status ? st.statusText : {}}
              />
              <InputSelect
                // t('common.information')
                label="Информация"
                value={information || 'Все'}
              />
            </>
          )}
        </View>
        <View style={st.buttonsContainer}>
          {isFilled() && (
            <Button
              title={t('common.m_reset')}
              onPress={clear}
              buttonContainerStyle={st.buttonGray}
              containerStyle={{flex: 0.49}}
            />
          )}
          <ButtonGradient
            disabled={false}
            onPress={handleSubmit}
            title={t('common.apply')}
            gradientColors={colors.gradientGreenBlue}
            containerStyle={{flex: !isFilled() ? 1 : 0.49}}
          />
        </View>
      </KeyboardListener>
    </SafeContainer>
  );
}
