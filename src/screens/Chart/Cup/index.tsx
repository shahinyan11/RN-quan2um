import React, {useEffect, useMemo, useState} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  getWhaleDealsFiltersReq,
  getWhaleDealsReq,
  selectOrderBook,
} from '@store/tradeview';

import st from './styles';
import Header from '@screens/Chart/Cup/Header';
import WhaleDeals from './WhaleDeals';

type CupProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

function Cup({containerStyle}: CupProps) {
  const dispatch = useDispatch();
  const orderBook = useSelector(selectOrderBook);
  const [isAlongside, setIsAlongside] = useState(true);
  const [leftTab, setLeftTab] = useState(1);

  useEffect(() => {
    dispatch(getWhaleDealsFiltersReq());
    dispatch(getWhaleDealsReq());
  }, []);

  const renderAskItem = (item: any) => {
    const qTotal = orderBook.bids.reduce((sum, item) => sum + item.q, 0);
    const percent = (item.q * 100) / qTotal;

    return (
      <View key={item.id}>
        <View
          style={[
            st.greenBackground,
            isAlongside ? {right: 0} : {left: 0},
            {width: `${percent}%`},
          ]}
        />
        <View style={st.row}>
          <Text style={st.textWhite}>{item.q}</Text>
          <Text style={st.textGreen}>{item.p}</Text>
          {!isAlongside && <View style={st.hidden} />}
        </View>
      </View>
    );
  };

  const renderBidsItem = (item: any) => {
    const qTotal = orderBook.ask.reduce((sum, item) => sum + item.q, 0);
    let percent = (item.q * 100) / qTotal;

    return (
      <View key={item.id}>
        <View
          style={[
            st.redBackground,
            isAlongside ? {left: 0} : {right: 0},
            {width: `${percent}%`},
          ]}
        />
        <View style={st.row}>
          {!isAlongside && <View style={st.hidden} />}
          <Text style={st.textRed}>{item.p}</Text>
          <Text style={[st.textWhite, st.textRight]}>{item.q}</Text>
        </View>
      </View>
    );
  };

  const visibleCount = useMemo(() => (isAlongside ? 16 : 8), [isAlongside]);

  return (
    <View style={[st.container, containerStyle]}>
      <Header
        onLeftTabChange={setLeftTab}
        onRightTabChange={setIsAlongside}
        isAlongside={isAlongside}
        hidePrices={leftTab !== 1}
      />
      {leftTab === 1 && (
        <View style={st.ph20}>
          <View style={[isAlongside ? st.bodyHorizontal : st.container]}>
            <View style={st.container}>
              {orderBook.ask
                .slice(-visibleCount)
                .map(item => renderAskItem(item))}
            </View>
            <View style={st.container}>
              {orderBook.bids
                .slice(-visibleCount)
                .map(item => renderBidsItem(item))}
            </View>
          </View>
        </View>
      )}
      {leftTab === 2 && <WhaleDeals />}
    </View>
  );
}

export default Cup;
