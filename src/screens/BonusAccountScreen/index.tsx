import React, {useState} from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {CalendarIcon} from '@assets/svgs/others';
import {selectBonusAccount} from '@store/bonusAccount/selectors';
import CountDown from '@components/CountDown';
import {useNavigation} from '@react-navigation/native';
import DatePickerCalendar from '@screens/Ecomining/DatePicker';
import Calendar from '@components/calendar';
import {showModal} from '@store/modal';
import BonusCard from '@screens/Dashboard/BonusCard';

const BonusAccountScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedDatesRangeStart, setSelectedDatesRangeStart] = useState('');
  const [selectedDatesRangeEnd, setSelectedDatesRangeEnd] = useState('');
  const {balance, balanceInUSD, currencyCode, expirationDate} =
    useSelector(selectBonusAccount);

  const handleDatePickerCallBack = (selectedDates: any) => {
    if (selectedDates[Object.keys(selectedDates)[1]] !== null) {
      setSelectedDatesRangeStart(selectedDates[Object.keys(selectedDates)[0]]);
      setSelectedDatesRangeEnd(selectedDates[Object.keys(selectedDates)[1]]);
    }
  };

  const onCalendarClick = () => {
    dispatch(showModal({modalType: 'CALENDAR'}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BonusCard />
      <Text type={'t4'} style={{marginTop: 30}}>
        {t('common.history_transactions')}
      </Text>
      <View style={styles.transactionsHeader}>
        <Text type={'t6'} style={styles.text}>
          {t('bonus_program.amount')}
        </Text>
        <Text type={'t6'} style={styles.text}>
          {t('bonus_program.transaction_type')}
        </Text>
        <Pressable style={styles.row} onPress={onCalendarClick}>
          <Text type={'t6'} style={[styles.text, {marginRight: 5}]}>
            {t('bonus_program.date')}
          </Text>
          <CalendarIcon />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BonusAccountScreen;
