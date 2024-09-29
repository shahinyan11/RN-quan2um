import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import InputSelect from '@components/inputs/InputSelect';
import ExchangeCard from './components/ExchangeCard';
import Text from '@components/textes/Text';
import st from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getExchangeList, getExchangeStatus} from '@store/exchange';
import {showModal} from '@store/modal';
import ExchangeTypeField from './components/ExchangeTypeField';
import {useTranslation} from 'react-i18next';
import ButtonGradient from '@components/buttons/ButtonGradient';
import * as colors from '@constants/colors';
import {scaledSize} from '@utils/scaledSize';
import {SvgUri} from 'react-native-svg';
import {
  selectCurrentExchange,
  selectSelectedMethod,
} from '@store/exchange/selectors';
import ScreenHeader from '@components/ScreenHeader';
import Icon from '@components/icons/Icon';
import SafeContainer from '@components/containers/SafeContainer';
import Tab from '@components/Tab';
import {EXCHANGE_TABS} from '@constants/tabs';
import validateExchange from '@validations/validateExchange';
import Loader from '@components/other/Loader';

export default function ExchangeScreen({navigation}: any) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const interval = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [typeValue, setTypeValue] = useState('');
  const [isExchangeActive, setIsExchangeActive] = useState(false);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const currentExchange = useSelector(selectCurrentExchange);
  const selectedMethod = useSelector(selectSelectedMethod);
  const [tab, setTab] = useState(EXCHANGE_TABS.DEPOSIT.id);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      dispatch(getExchangeStatus());
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      clearInterval(interval.current);
      interval.current = undefined;
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);

    dispatch(getExchangeList(tab)).then(() => {
      setLoading(false);
    });
  }, [tab, dispatch]);

  useEffect(() => {
    if (!currentExchange) {
      setFromAmount('');
      setToAmount('');
    }
  }, [tab, selectedMethod]);

  useEffect(
    () => {
      if (currentExchange) {
        setTypeValue(currentExchange.card);
        setIsExchangeActive(true);

        openDetails();

        if (!interval.current) {
          setStatusInterval();
        }
      } else {
        setTypeValue('');
        setIsExchangeActive(false);
        clearInterval(interval.current);
        interval.current = undefined;
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentExchange],
  );

  const setStatusInterval = () => {
    interval.current = setInterval(() => {
      dispatch(getExchangeStatus());
    }, 15000);
  };

  const navigationTo = (screenName: string) => () => {
    navigation.navigate(screenName, {tab});
  };

  const handlePress = () => {
    dispatch(
      showModal({
        modalType: 'EXCHANGE_METHOD_SELECT',
      }),
    );
  };

  const openDetails = async () => {
    const err = await validateExchange({
      data: {
        amount: +fromAmount,
        method: selectedMethod.method,
        from: typeValue,
      },
      min: selectedMethod?.min,
      max: selectedMethod?.max,
    });

    if (err) {
      setError(err.message);
      return;
    }

    dispatch(
      showModal({
        modalType: 'EXCHANGE_PROCESS',
        modalProps: {
          exchangeAmount: +fromAmount,
          receiptAmount: +toAmount,
          paymentMethod: selectedMethod,
          from: typeValue,
        },
      }),
    );
  };

  const handleTypeChange = (val: string) => setTypeValue(val);

  const handleTabChange = useCallback((tabId: number) => setTab(tabId), []);

  return (
    <SafeContainer containerStyle={st.container}>
      <ScreenHeader
        title={t('common.exchange_process')}
        addRight={
          <Icon
            name="history"
            disabled={false}
            onPress={navigationTo('ExchangeTransactionScreen')}
          />
        }
      />
      <View style={{flex: 1}}>
        <Tab
          onChange={handleTabChange}
          tabs={Object.values(EXCHANGE_TABS)}
          containerStyle={st.tab}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={st.scrollContainer}>
          <InputSelect
            onPress={handlePress}
            addBefore={
              <SvgUri
                width={scaledSize(30)}
                height={scaledSize(30)}
                style={st.mr15}
                uri={selectedMethod?.bank_logo || null}
              />
            }
            label={t('common.payment_method')}
            value={selectedMethod?.title || ''}
            disabled={isExchangeActive}
          />
          <View>
            <Text style={st.label}>
              {t(`exchange.enter_${selectedMethod?.type || 'card'}_number`)}
            </Text>
            <ExchangeTypeField
              value={typeValue}
              // type={selectedMethod.type || 'card'}
              type={'card'}
              onChange={handleTypeChange}
              disabled={isExchangeActive}
            />
          </View>

          <ExchangeCard
            onFromChange={setFromAmount}
            onToChange={setToAmount}
            fromAmount={fromAmount}
            toAmount={toAmount}
            tab={tab}
          />

          <View style={st.expectedBox}>
            <View style={st.row}>
              <Text type={'t4'} style={st.text}>
                {t('invest_mn.expected_to_receive')}
              </Text>
              <Text type={'t4'}>
                {toAmount ? Number(toAmount)?.toFixed(2) : 0}{' '}
                {selectedMethod?.to_short}
              </Text>
            </View>
            {error && <Text style={st.errorText}>{error}</Text>}
            <ButtonGradient
              disabled={!currentExchange && (!fromAmount || !typeValue)}
              onPress={openDetails}
              title={
                currentExchange
                  ? t('exchange.watch_exchange')
                  : t('common.make_exchange')
              }
              gradientColors={colors.gradientGreenBlue}
            />
          </View>
        </ScrollView>

        {loading && (
          <View style={st.loaderView}>
            <Loader size="large" />
          </View>
        )}
      </View>
    </SafeContainer>
  );
}
