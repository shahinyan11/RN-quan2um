import React, {FC} from 'react';
import {ZERO_DATE_VALUE} from '@utils/secondsToDhms';
import {Text} from 'react-native';

type PropsT = {
  text: string;
  value: string;
};

const TimeItem: FC<PropsT> = props => {
  const {value, text} = props;

  if (value === ZERO_DATE_VALUE) {
    return null;
  }

  return (
    <Text>
      {value}
      &nbsp;
      {text}.
    </Text>
  );
};

export default TimeItem;
