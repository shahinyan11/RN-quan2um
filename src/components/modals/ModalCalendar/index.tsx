import React, {useState} from 'react';
import {Pressable, View} from 'react-native';

import st from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {hideModal} from '@store/modal';
import Calendar from '@components/calendar';

export default function ModalCalendar() {
  const {t} = useTranslation();
  const [selectedDatesRangeStart, setSelectedDatesRangeStart] = useState('');
  const [selectedDatesRangeEnd, setSelectedDatesRangeEnd] = useState('');
  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());

  const handleDatePickerCallBack = (selectedDates: any) => {
    if (selectedDates[Object.keys(selectedDates)[1]] !== null) {
      setSelectedDatesRangeStart(selectedDates[Object.keys(selectedDates)[0]]);
      setSelectedDatesRangeEnd(selectedDates[Object.keys(selectedDates)[1]]);
    }
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Pressable style={{flex: 0.3}} onPress={closeModal} />
      <View style={st.container}>
        <Calendar
          onChange={handleDatePickerCallBack}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            selectedDayTextColor: '#FFFFFF',
            selectedDayBackgroundColor: '#05DB93',
            selectedBetweenDayBackgroundTextColor: 'rgba(5, 219, 147, 0.2)',
            dayTextColor: '#FFFFFF',
            holidayColor: '#FFFFFF',
          }}
          disabledAfterToday={true}
        />
      </View>
    </View>
  );
}
