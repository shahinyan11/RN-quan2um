import Button from '@components/buttons/Button';
import ButtonGradient from '@components/buttons/ButtonGradient';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Input from '@components/inputs/Input';
import ModalBottom from '@components/modals/ModalBottom';
import Text from '@components/textes/Text';
import {
  getMasterNodes,
  onInvest,
  onWithdrawal,
  selectMasterNodeData,
} from '@store/ecomining';
import {selectLoadingSend} from '@store/tradeview';
import {MONTHS} from '@utils/fns';

import {scaledSize} from '@utils/scaledSize';
import bigDecimal from 'js-big-decimal';
import moment from 'moment';
// import 'moment/locale/ru';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DatePickerCalendar from '../DatePicker';

import RenderTransactionList from '../TransactionList/RenderTransactionList';
import styles from './style';
interface IModalProps {
  alert?: boolean;
  datePicker?: boolean;
  sendTransaction?: boolean;
  isVisible: boolean;
  resetModalStateCallback?: any;
  masterNodeData?: any;
  masterNodeDataHistory?: any;
  investmentData?: any;
}

const EcominingBottomModal = ({
  isVisible,
  alert,
  datePicker,
  sendTransaction,
  resetModalStateCallback,
  masterNodeData,
  masterNodeDataHistory,
  investmentData,
}: IModalProps) => {
  const [amountToInvest, setAmountToInvest] = useState('');
  const [height, setHeight] = useState(scaledSize(300));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDatesRangeStart, setSelectedDatesRangeStart] = useState('');
  const [selectedDatesRangeEnd, setSelectedDatesRangeEnd] = useState('');
  const [filteredByDates, setFilteredByDates] = useState([]);
  const [showTransactionRange, setShowTransactionRange] = useState(false);
  const [backgroundColorChange, setBackgroundColorChange] = useState(false);
  const [selectedRange, setselectedRange] = useState('');
  const [alertContext, setAlertContext] = useState([]);
  const platformDimension = Platform.OS === 'ios' ? 130 : 120;
  const screenHeight = Dimensions.get('window').height - platformDimension;
  const dispatch = useDispatch();
  const loadingSend = useSelector(selectLoadingSend);
  const {t} = useTranslation();

  useEffect(() => {
    setModalVisible(isVisible);
    if (isVisible) {
      if (alert) {
        setHeight(scaledSize(400));
      } else if (datePicker) {
        setHeight(scaledSize(screenHeight));
        setBackgroundColorChange(true);
      } else {
        setHeight(scaledSize(300));
      }
    }

    return () => {
      setModalVisible(false);
    };
  }, [height, isVisible, screenHeight, alert, datePicker]);

  const handleDatePickerCallBack = (selectedDates: any) => {
    if (selectedDates[Object.keys(selectedDates)[1]] !== null) {
      setSelectedDatesRangeStart(selectedDates[Object.keys(selectedDates)[0]]);
      setSelectedDatesRangeEnd(selectedDates[Object.keys(selectedDates)[1]]);
    }
  };

  const filteredTransactionHistories = (
    data: any,
    dateFrom: Date,
    dateTo: Date,
  ) => {
    return data.filter((item: any) => {
      const time = new Date(item.time * 1000);
      return time >= dateFrom && time <= dateTo;
    });
  };

  const selectedTransactionHistories = (dateFrom: Date, dateTo: Date) => {
    const startDate = dateFrom.getDate();
    const endDate = dateTo.getDate();
    var monthRange = dateTo.getMonth();
    // moment.locale('ru-RU');
    // const monthRange = moment(dateTo).format('MMMM');
    setselectedRange(
      `${startDate}-${endDate} ${t(`month_abbrev.${MONTHS[monthRange]}`)}`,
    );
  };

  const onSuccess = () => {
    setAmountToInvest('');
    dispatch(getMasterNodes());
    resetModalState();
  };

  const investOnSubmit = () => {
    const value = amountToInvest.replace(',', '.');
    const totalValue = Number(value);
    if (!isNaN(totalValue)) {
      dispatch(
        onInvest(
          {
            totalAmount: +totalValue,
          },
          onSuccess,
        ),
      );
    }
  };

  const onWithdrawalConfirm = () => {
    const idValue = Number(investmentData.id);
    dispatch(
      onWithdrawal(
        {
          investmentId: idValue,
        },
        onSuccess,
      ),
    );
  };

  useEffect(() => {
    if (selectedDatesRangeStart !== '' && selectedDatesRangeEnd !== '') {
      const dateFrom = new Date(selectedDatesRangeStart);
      const dateTo = new Date(selectedDatesRangeEnd);

      if (masterNodeDataHistory !== undefined) {
        const _filtered = filteredTransactionHistories(
          masterNodeDataHistory,
          dateFrom,
          dateTo,
        );
        setFilteredByDates(_filtered);
        selectedTransactionHistories(dateFrom, dateTo);
        setTimeout(() => {
          setShowTransactionRange(true);
          setBackgroundColorChange(false);
        }, 800);
      }
    }
    return () => {
      setSelectedDatesRangeStart('');
      setSelectedDatesRangeEnd('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedDatesRangeStart,
    selectedDatesRangeEnd,
    masterNodeDataHistory,
    dispatch,
    amountToInvest,
  ]);

  const resetModalState = () => {
    setModalVisible(false);
    setShowTransactionRange(false);
    resetModalStateCallback();
  };

  useEffect(() => {
    // Replace custom character
    if (alert) {
      const replace = t('invest_mn.outcome_begin')
        .replace('  ', ` ${investmentData.deposit_face} `)
        .replace(/\\/g, '')
        .replace('""', `"${investmentData.name}"`);
      setAlertContext(replace.split(' '));
    }
  }, [alert, t, investmentData]);

  return (
    <ModalBottom
      visible={modalVisible}
      height={height}
      modalContainerStyle={
        backgroundColorChange && {backgroundColor: '#085F6B'}
      }
      onClose={() => {
        resetModalState();
      }}>
      {/* <Alert /> */}
      {alert && (
        <>
          <View style={styles.warningModalContainer}>
            <Icon name="big-warning-icon" />
            <Text type="t4" style={styles.warningText}>
              {alertContext.map((text, index) => {
                var regex = /(\d+)/;
                var str = alertContext.toString();
                var match = str.match(regex)![0];
                if (match === text) {
                  return (
                    <Text
                      key={index}
                      type="t4"
                      style={styles.warningHighlightedText}>
                      {text}{' '}
                    </Text>
                  );
                }
                return `${text} `;
              })}
            </Text>

            <Row
              justifyContent="space-between"
              containerStyle={styles.warningButtonContainer}>
              <ButtonGradient
                gradientColors={['#0094FF', '#8995FF']}
                title={t('common.cancel')}
                containerStyle={styles.cancelWarningButton}
                titleStyle={styles.warningButtonTitleStyle}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Button
                title={t('common.confirm')}
                buttonContainerStyle={styles.warningButtonConfirm}
                titleStyle={[
                  styles.mininalText,
                  styles.warningButtonTitleStyle,
                ]}
                onPress={() => {
                  onWithdrawalConfirm();
                }}
              />
            </Row>
          </View>
        </>
      )}
      {/* DatePicker */}
      {datePicker && (
        <>
          {!showTransactionRange ? (
            <DatePickerCalendar callback={handleDatePickerCallBack} />
          ) : (
            <>
              <Text type="t3" style={{textAlign: 'center'}}>
                {t('invest_mn.operations')}
              </Text>
              <Text
                type="tTiny"
                style={{color: '#349EFF'}}
                onPress={() => {
                  resetModalState();
                }}>
                {t('common.close')}
              </Text>
              <Row>
                <Text
                  type="t4"
                  style={styles.selectedDateRange}
                  onPress={() => {
                    setShowTransactionRange(false);
                    setBackgroundColorChange(true);
                  }}>
                  {selectedRange}
                </Text>
                <Icon
                  name="close-small"
                  disabled={false}
                  containerStyle={{
                    marginTop: scaledSize(4),
                    paddingHorizontal: scaledSize(5),
                  }}
                  onPress={() => {
                    setShowTransactionRange(false);
                    setBackgroundColorChange(true);
                  }}
                />
              </Row>

              <RenderTransactionList
                mappingData={filteredByDates}
                isFlatList={true}
              />
            </>
          )}
        </>
      )}
      {/* Send Trnasaction */}
      {sendTransaction && (
        <>
          <View style={styles.modalContainer}>
            <>
              <Row>
                <Text
                  type="t3"
                  style={[styles.mininalText, {paddingRight: scaledSize(10)}]}>
                  {t('invest_mn.outcome_balance')}
                </Text>
                <Row>
                  <Text type="t3" style={styles.regularStyle}>
                    {masterNodeData?.balance_face}
                  </Text>
                  <Text type="tTiny" style={styles.subMinimizedText}>
                    BTCa
                  </Text>
                </Row>
              </Row>

              <Input
                label={t('invest_mn.outcome_invest')}
                placeholder={t('input.place_start_type')}
                keyboardType="decimal-pad"
                labelStyle={styles.modalInnputLabelStyle}
                keyboardAppearance="dark"
                value={amountToInvest}
                onChangeText={setAmountToInvest}
              />
              <ButtonGradient
                disabled={loadingSend}
                gradientColors={['#00FF75', '#0075FF']}
                title={t('invest_mn.outcome_coins')}
                containerStyle={styles.buttonContainer}
                onPress={() => {
                  investOnSubmit();
                }}
              />
            </>
          </View>
        </>
      )}
    </ModalBottom>
  );
};
export default EcominingBottomModal;
