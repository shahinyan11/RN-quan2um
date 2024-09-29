import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import {scaledSize} from '@utils/scaledSize';
import IconGradient from '@components/icons/IconGradient';

const styles = EStyleSheet.create({
  containerStyle: {
    paddingHorizontal: scaledSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitleStyle: {
    color: '$white75',
    marginTop: 10,
  },
  iconContainerStyle: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 24,
  },
});

const NoInternet = () => {
  const gColorStart = '#E73E99';
  const gColorEnd = '#E90C0C';

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      <IconGradient
        name="no-network"
        colors={[gColorStart, gColorEnd]}
        containerStyle={styles.iconContainerStyle}
      />
      <Text type="t3">No connection</Text>
      <Text textAlign="center" style={styles.subTitleStyle}>
        Please check your internet connection and try again
      </Text>
    </SafeContainer>
  );
};

export default NoInternet;
