import React from 'react';
import {View} from 'react-native';
import Calendar from '@components/calendar';
const DatePickerCalendar = ({callback}: any) => {
  // const _date = new Date();

  // const nowDate =
  //   _date.getFullYear() +
  //   '-' +
  //   ('0' + (_date.getMonth() + 1)).slice(-2) +
  //   '-' +
  //   _date.getDate();

  return (
    <View style={{flex: 1}}>
      <Calendar
        onChange={({startDate, endDate}) => {
          callback({startDate, endDate});
        }}
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
  );
};

export default DatePickerCalendar;
