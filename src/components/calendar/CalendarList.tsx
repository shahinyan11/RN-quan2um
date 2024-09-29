import React, {useMemo, useCallback, useState, useEffect} from 'react';
import moment from 'moment';
import {FlatList, View} from 'react-native';
// components
import Month from './Month';
// data
import {getMonths} from './utils/data';
// types
import {Month_Type} from './utils/data';
import {LOCALE_TYPE} from './utils/locale';
import {Style} from './index';
import RefreshLoader from '@components/other/RefreshLoader';

interface Props {
  pastYearRange: number;
  futureYearRange: number;
  initialNumToRender: number;
  locale: LOCALE_TYPE;
  handlePress: (date: string) => void;
  startDate: string | null;
  endDate: string | null;
  style?: Style;
  flatListProps?: any;
  isMonthFirst?: boolean;
  disabledAfterToday?: boolean;
}

const LAYOUT_HEIGHT = 350;
const CalendarList = ({
  pastYearRange,
  futureYearRange,
  initialNumToRender,
  locale,
  handlePress,
  startDate,
  endDate,
  flatListProps,
  isMonthFirst,
  disabledAfterToday,
  style,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const months: Month_Type[] = useMemo(
    () => getMonths(pastYearRange, futureYearRange),
    [pastYearRange, futureYearRange],
  );

  const getInitialIndex = () => {
    return months.findIndex((month: Month_Type) => {
      const targetDate = startDate ? moment(startDate) : moment();
      return month.id === targetDate.format('YYYY-MM');
    });
  };

  const handleRenderItem = useCallback(
    ({item}) => (
      <View
        style={{
          height: LAYOUT_HEIGHT,
        }}>
        <Month
          item={item}
          locale={locale}
          handlePress={handlePress}
          startDate={startDate}
          endDate={endDate}
          isMonthFirst={isMonthFirst}
          disabledAfterToday={disabledAfterToday}
          style={style}
        />
      </View>
    ),

    [locale.today, startDate, endDate],
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <View style={[{position: 'relative', flex: 1}, style?.container]}>
      <FlatList
        keyExtractor={(item: Month_Type) => item.id}
        data={months}
        renderItem={handleRenderItem}
        getItemLayout={(_, index) => ({
          length: LAYOUT_HEIGHT,
          offset: LAYOUT_HEIGHT * index,
          index,
        })}
        initialScrollIndex={getInitialIndex()}
        initialNumToRender={2}
        {...flatListProps}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        refreshControl={<RefreshLoader refreshing={loading} />}
      />
    </View>
  );
};

export default CalendarList;
