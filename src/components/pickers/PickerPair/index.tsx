import React, {useCallback} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ImageGradient from '@components/icons/ImageGradient';

import {scaledSize} from '@utils/scaledSize';

import {selectLoading, selectPair} from '@store/tradeview';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: scaledSize(8),
    borderRadius: scaledSize(8),
    marginRight: scaledSize(8),
    backgroundColor: '$darkForms',
    height: scaledSize(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeftContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    zIndex: 10,
  },
  iconRightContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
  },
  rightContainerStyle: {
    zIndex: -10,
    left: scaledSize(8) * -1,
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const DEFAULT_BG_ICON_COLOR = 'rgba(255,255,255,0.1)';

const PickerPair = ({onPress}: {onPress: () => void}) => {
  const pair = useSelector(selectPair);
  const loading = useSelector(selectLoading);

  const percentColor = useCallback(() => {
    if (pair.change < 0) {
      return EStyleSheet.value('$red');
    } else {
      return EStyleSheet.value('$green');
    }
  }, [pair.change]);

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      <Row>
        <ImageGradient
          iconSize={scaledSize(15)}
          url={pair.main_currency.logo_png}
          colors={[
            pair.main_currency.color_hex || DEFAULT_BG_ICON_COLOR,
            pair.main_currency.color_hex2 || DEFAULT_BG_ICON_COLOR,
          ]}
          iconContainerStyle={styles.iconLeftContainerStyle}
        />

        <ImageGradient
          iconSize={scaledSize(15)}
          url={pair.base_currency.logo_png}
          colors={[
            pair.base_currency.color_hex || DEFAULT_BG_ICON_COLOR,
            pair.base_currency.color_hex2 || DEFAULT_BG_ICON_COLOR,
          ]}
          iconContainerStyle={styles.iconRightContainerStyle}
          containerStyle={styles.rightContainerStyle}
        />
      </Row>
      <Row containerStyle={styles.mainContainerStyle}>
        <Text type="btnSmall">
          {`${pair.main_currency.code}/${pair.base_currency.code}`}
        </Text>
        <Text
          type="btnSmall"
          style={{color: percentColor()}}>{`${pair.change}%`}</Text>
      </Row>
    </TouchableOpacity>
  );
};

export default PickerPair;
