import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import st from './styles';

type Props = {
  amount: string | number;
  currency?: string;
  reduce?: boolean;
  count?: number;
};

const FitCurrency = ({amount, currency, reduce = false, count = 6}: Props) => {
  const [isFit, setIsFit] = useState(true);

  useEffect(() => {
    setIsFit(!reduce);
  }, [reduce]);

  const handleTextLayout = ({nativeEvent}: any) => {
    const isMultiLine = nativeEvent.lines.length > 1;

    if (isFit && isMultiLine) {
      setIsFit(!isMultiLine);
    }
  };

  return (
    <View>
      <Text style={st.text} onTextLayout={handleTextLayout}>
        {isFit ? amount : Number(amount)?.toFixed(count)}&nbsp;
        {currency}
      </Text>
    </View>
  );
};

export default FitCurrency;
