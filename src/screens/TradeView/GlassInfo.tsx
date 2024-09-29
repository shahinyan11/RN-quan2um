import React, {useEffect, useState, memo} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Row from '@components/containers/Row';
import styles from '@screens/TradeView/styles';
import Text from '@components/textes/Text';

const GlassInfo = ({
  last_price,
  last_price_face,
  last_price_fiat_face,
}: {
  last_price: number;
  last_price_face: string;
  last_price_fiat_face: string;
}) => {
  const colorTitleSell = EStyleSheet.value('$red');
  const colorTitleBuy = EStyleSheet.value('$green');
  const oldLastPrice = React.useRef(0);

  const [titleColor, setTitleColor] = useState(colorTitleBuy);

  useEffect(() => {
    if (last_price > oldLastPrice.current) {
      setTitleColor(colorTitleBuy);
    } else {
      setTitleColor(colorTitleSell);
    }
    oldLastPrice.current = last_price;
  }, [last_price, colorTitleBuy, colorTitleSell]);

  return (
    <Row
      justifyContent="space-around"
      containerStyle={styles.balanceContainerStyle}>
      <Text type="btnSmall" style={{color: titleColor}}>
        {last_price_face}
      </Text>
      <Text type="btnSmall">${last_price_fiat_face}</Text>
    </Row>
  );
};

export default memo(GlassInfo);
