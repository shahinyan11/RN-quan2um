import React from 'react';
import {useTranslation} from 'react-i18next';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';

/**
 * Header of order bars
 * @param {string} pairCode
 */
const HeaderOrdersBar = ({pairCode}: any) => {
  const codes = pairCode.split('_');
  const {t} = useTranslation();

  return (
    <Row justifyContent="space-between" containerStyle={styles.containerStyle}>
      <View style={styles.leftBlockContainerStyle}>
        <Text style={styles.titleStyle}>
          {`${t('common.total')}(${codes[0].toUpperCase()})`}
        </Text>
      </View>
      <View style={styles.centerBlockContainerStyle}>
        <Text style={styles.titleStyle}>
          {`${t('common.price')}(${codes[1].toUpperCase()})`}
        </Text>
      </View>
      <View style={styles.rightBlockContainerStyle}>
        <Text textAlign="center" style={styles.titleStyle}>
          {`${t('common.total')}(${codes[0].toUpperCase()})`}
        </Text>
      </View>
    </Row>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    paddingVertical: scaledSize(10),
  },
  leftBlockContainerStyle: {
    flex: 1,
  },
  centerBlockContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  rightBlockContainerStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleStyle: {
    fontSize: scaledFontSize(8),
    color: '$white25',
  },
});

export default HeaderOrdersBar;
