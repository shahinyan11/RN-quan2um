import React, {FC} from 'react';
// import cn from 'classnames'
import {secondsToDhms} from '@utils/secondsToDhms';
import useCountdown from '@hooks/useCountdown';
import TimeItem from './TimeItem';
import {useTranslation} from 'react-i18next';
import moment from 'moment/moment';
import {StyleProp, TextStyle} from 'react-native';
import Text from '@components/textes/Text';

type PropsT = {
  className?: string;
  expirationDate: number;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
};

const Countdown: FC<PropsT> = ({expirationDate, text, textStyle}) => {
  const {t} = useTranslation();
  const timeToExpirationDate = moment(expirationDate * 1000).diff(moment());
  const {count} = useCountdown(timeToExpirationDate, expirationDate);
  const {d, h, m} = secondsToDhms(count);

  if (!m) {
    return null;
  }

  return (
    <Text type={'btnMini'} style={textStyle}>
      {text || t('date_time.expires_in')}: &nbsp;
      <TimeItem text={t('date_time.day_short')} value={d} />
      &nbsp;
      <TimeItem text={t('date_time.hour_short')} value={h} />
      &nbsp;
      <TimeItem text={t('date_time.minute_short')} value={m} />
    </Text>
  );
};

export default Countdown;
