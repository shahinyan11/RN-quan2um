import React, {memo, useCallback, useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import bigDecimal from 'js-big-decimal';

import ButtonGradient from '@components/buttons/ButtonGradient';
import ButtonSwitcher from '@components/buttons/ButtonSwitcher';
import Column from '@components/containers/Column';
import Row from '@components/containers/Row';
import {InputWithAction} from '@components/inputs/InputWithAction';
import PickerModal from '@components/pickers/PickerModal';
import Text from '@components/textes/Text';
import PickerPercent from '@components/pickers/PickerPercent';

import {onCreateOrder} from '@store/tradeview/actions';
import {selectLoadingSend, selectPair} from '@store/tradeview';

import {Bet, TYPE_OF_ORDER} from '@constants/index';
import {validateNumber} from '@utils/validation';
import sliceDecimals from '@utils/sliceDecimals';
import useTConstants from '@hooks/useTConstants';

import styles from './styles';
import SubmitModal from '@screens/TradeView/SubmitModal';

const FormTradeView = ({
  valueLimit,
  valueMarket,
  setValueLimit,
  setValueMarket,
  action,
  onSuccess,
}: {
  valueLimit: string;
  valueMarket: string;
  setValueLimit: (value: string) => void;
  setValueMarket: (value: string) => void;
  action: TYPE_OF_ORDER;
  onSuccess: () => void;
}) => {
  const {t} = useTranslation();
  const {TYPES_OF_BET, SELECTORS_QUANTITY} = useTConstants();
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const [isValid, setValid] = useState(true);
  const [typeBet, setTypeBet] = useState(TYPES_OF_BET[0]);
  const [selector, setSelector] = useState(SELECTORS_QUANTITY[0]);
  const [selectedAction, setSelectedAction] = useState(action);
  const [percent, setPercent] = useState(undefined as undefined | number);
  const [total, setTotal] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const loading = useSelector(selectLoadingSend);

  const isBuy = selectedAction === 'buy';

  useEffect(() => {
    setSelectedAction(action);
  }, [action]);

  const getPairCode = useCallback(
    () => `${pair.main_currency.slug}_${pair.base_currency.slug}`,
    [pair],
  );

  const onChangeSelectedAction = useCallback(
    (value: TYPE_OF_ORDER) => () => setSelectedAction(value),
    [],
  );

  const handleSetTypeBet = (object: any) => {
    setTypeBet(object);
    setSelector(SELECTORS_QUANTITY[0]);
    setValueMarket('');
    setTotal('');
    setValueLimit('');
  };

  const setTotalValue = (value: string) => {
    let tempTotal = 0;
    if (typeBet.value === 'limit') {
      tempTotal = Number(bigDecimal.multiply(+valueLimit, +value));
    } else {
      tempTotal = Number(bigDecimal.multiply(+value, pair.last_price));
    }

    if (isNaN(tempTotal)) {
      return;
    }

    const slicedValue = sliceDecimals(
      tempTotal.toString(),
      pair.total_decimals,
    );
    setTotal(slicedValue);
  };

  const onEnterValueLimit = (value: string) => {
    if (validateNumber(value)) {
      const quantityDecimals = pair.base_currency.is_fiat
        ? 2
        : pair.price_decimals;
      const newValue = sliceDecimals(value, quantityDecimals);
      setValueLimit(newValue);

      const tempTotal = bigDecimal.multiply(+newValue, +valueMarket);
      const newTotalValue = sliceDecimals(tempTotal, pair.total_decimals);

      setTotal(newTotalValue);
    }
  };

  const onEnterValueMarket = (value: string) => {
    setPercent(undefined);
    const validNumber = validateNumber(value);
    if (validNumber) {
      const quantityDecimalsTotal = pair.main_currency.is_fiat
        ? 2
        : pair.total_decimals;
      const quantityDecimalsMarket = pair.main_currency.is_fiat
        ? 2
        : pair.quantity_decimals;
      const newValueTotal = sliceDecimals(value, quantityDecimalsTotal);
      const newValueMarket = sliceDecimals(value, quantityDecimalsMarket);
      setValueMarket(newValueMarket);
      setTotalValue(newValueTotal);
    }
  };

  const onSuccessOrder = () => {
    onSuccess();
    setTotal('');
  };

  const onSubmit = () => {
    const totalValue =
      typeBet.value === 'limit'
        ? Number(bigDecimal.multiply(valueMarket, valueLimit))
        : undefined;
    dispatch(
      onCreateOrder(
        {
          pair: getPairCode(),
          type: selectedAction,
          quantity: +valueMarket,
          price: typeBet.value === 'limit' ? +valueLimit : undefined,
          total: totalValue,
        },
        onSuccessOrder,
      ),
    );
  };

  const handlePreSubmit = () => {
    if (typeBet.value === 'limit') {
      setVisibleModal(true);
    } else {
      onSubmit();
    }
  };

  useEffect(() => {
    if (percent && isBuy) {
      const percentDivided = bigDecimal.divide(+percent, 100, 8);
      const tempValueMultiply = bigDecimal.multiply(
        +pair.assets.base,
        percentDivided,
      );

      const tempValueDivide = bigDecimal.divide(
        tempValueMultiply,
        pair.last_price,
        8,
      );
      const valueMarketSliced = sliceDecimals(
        tempValueDivide,
        pair.quantity_decimals,
      );
      const valueTotal = sliceDecimals(tempValueDivide, pair.total_decimals);

      setValueMarket(valueMarketSliced);
      setTotalValue(valueTotal);
    } else if (percent && !isBuy) {
      const percentDivided = bigDecimal.divide(+percent, 100, 8);
      const tempValueMarket = bigDecimal.multiply(
        +pair.assets.main,
        percentDivided,
      );

      const valueMarketSliced = sliceDecimals(
        tempValueMarket,
        pair.quantity_decimals,
      );
      const valueTotal = sliceDecimals(tempValueMarket, pair.total_decimals);

      setValueMarket(valueMarketSliced);
      setTotalValue(valueTotal);
    }
  }, [percent, pair, isBuy]);

  useEffect(() => {
    try {
      if (typeBet.value === 'limit') {
        setValid(!(Boolean(+valueMarket) && Boolean(+valueLimit)));
      } else {
        setValid(!+valueMarket);
      }
    } catch (e) {
      console.log('[Error] Checking validation');
    }
  }, [valueMarket, valueLimit, typeBet]);

  const onEnterValueTotal = (value: string) => {
    setPercent(undefined);
    if (validateNumber(value)) {
      const newValue = bigDecimal.divide(+value, pair.last_price, 8);
      const newMarketValue = sliceDecimals(
        newValue.toString(),
        pair.quantity_decimals,
      );
      setValueMarket(newMarketValue);

      const newTotalValue = sliceDecimals(value, pair.total_decimals);
      setTotal(newTotalValue);
    }
  };

  const onEnterTotal = (value: string) => {
    if (validateNumber(value)) {
      const newTotalValue = sliceDecimals(value, pair.total_decimals);

      if (+valueLimit !== 0) {
        const newValue = bigDecimal.divide(+newTotalValue, valueLimit, 8);
        let newMarketValue = sliceDecimals(newValue, pair.quantity_decimals);
        if (newMarketValue[newMarketValue.length - 1] === '.') {
          newMarketValue = newMarketValue.slice(0, -1);
        }
        setValueMarket(newMarketValue);
      }

      setTotal(newTotalValue);

      if (!valueLimit) {
        const newLimitValue = bigDecimal.divide(+value, +valueMarket || 1, 8);
        const quantityDecimals = pair.base_currency.is_fiat
          ? 2
          : pair.price_decimals;
        const newValue = sliceDecimals(newLimitValue, quantityDecimals);
        if (newValue === '0') {
          return;
        }
        setValueLimit(newValue);
      }
    }
  };

  const operationText = `${
    isBuy ? t('common.purchase') : t('create_order.submit_sell')
  } / ${typeBet.title}`;

  const handleSetPercent = (value: any) => {
    if (!value) {
      setPercent(value);
      setTotal('');
      setValueMarket('');
    } else {
      setPercent(value);
    }
  };

  return (
    <Column containerStyle={styles.leftBlockContainerStyle}>
      <Row containerStyle={styles.btnContainerStyle}>
        <ButtonSwitcher
          active={isBuy}
          title={t('create_order.submit_buy')}
          containerStyle={styles.leftButtonContainerStyle}
          onPress={onChangeSelectedAction('buy')}
        />
        <ButtonSwitcher
          active={!isBuy}
          title={t('create_order.submit_sell')}
          onPress={onChangeSelectedAction('sell')}
        />
      </Row>
      <PickerModal<Bet>
        data={TYPES_OF_BET}
        value={typeBet}
        onPress={handleSetTypeBet}
      />

      {typeBet.value !== 'limit' && (
        <PickerModal
          data={SELECTORS_QUANTITY}
          value={selector}
          onPress={setSelector}
        />
      )}

      {selector.value === 'quantity' ? (
        <InputWithAction
          placeholder={`${t('common.sum')} (${pair.main_currency.code})`}
          value={valueMarket}
          onChangeText={onEnterValueMarket}
        />
      ) : (
        <InputWithAction
          placeholder={`${t('common.sum')} (${pair.base_currency.code})`}
          value={total}
          onChangeText={onEnterValueTotal}
        />
      )}

      {typeBet.value === 'limit' && (
        <InputWithAction
          placeholder={`${t('common.price')} (${pair.base_currency.code})`}
          value={valueLimit}
          onChangeText={onEnterValueLimit}
        />
      )}

      <Row justifyContent="space-between">
        <Text type="textMini" style={styles.labelStyle}>
          {t('common.available')} {pair.main_currency.code}:
        </Text>
        <Text type="textMini">{pair.assets.main_face}</Text>
      </Row>

      <Row justifyContent="space-between">
        <Text type="textMini" style={styles.labelStyle}>
          {t('common.available')} {pair.base_currency.code}:
        </Text>
        <Text type="textMini">{pair.assets.base_face}</Text>
      </Row>

      {typeBet.value === 'market' ? (
        <PickerPercent value={percent} onPress={handleSetPercent} />
      ) : (
        <InputWithAction
          placeholder={`${t('common.total')} (${pair.base_currency.code})`}
          value={total}
          onChangeText={onEnterTotal}
        />
      )}

      <Text type="textMini" style={styles.labelStyle}>
        {t('common.fee')}: {pair.assets.fee || 0}%
      </Text>

      {!isBuy ? (
        <ButtonGradient
          disabled={isValid || loading}
          onPress={handlePreSubmit}
          title={`${t('create_order.submit_sell')} ${
            pair.main_currency.code || 'BTC'
          }`}
          gradientColors={[
            EStyleSheet.value('$gRedStart'),
            EStyleSheet.value('$gRedEnd'),
          ]}
          containerStyle={styles.btnSubmitContainerStyle}
        />
      ) : (
        <ButtonGradient
          disabled={isValid || loading}
          onPress={handlePreSubmit}
          title={`${t('create_order.submit_buy')} ${
            pair.main_currency.code || 'BTC'
          }`}
          gradientColors={[
            EStyleSheet.value('$gGreenStart'),
            EStyleSheet.value('$gGreenEnd'),
          ]}
          containerStyle={styles.btnSubmitContainerStyle}
        />
      )}
      <SubmitModal
        visible={visibleModal}
        setVisibleModal={() => setVisibleModal(false)}
        operationText={operationText}
        data={{
          total: bigDecimal.multiply(valueMarket, valueLimit),
          quantity: valueMarket,
          price: valueLimit,
        }}
        onSubmit={onSubmit}
        isBuy={isBuy}
      />
    </Column>
  );
};
export default memo(FormTradeView);
