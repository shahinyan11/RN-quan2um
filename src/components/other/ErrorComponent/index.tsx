import React, {memo} from 'react';

import {View} from 'react-native';

import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import SafeContainer from '@components/containers/SafeContainer';

import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: scaledSize(24),
    justifyContent: 'center',
  },
  descriptionStyle: {
    marginVertical: scaledSize(20),
  },
});

const ErrorComponent = (props: {error: Error; resetError: any}) => (
  <SafeContainer containerStyle={styles.containerStyle}>
    <Text type="t4">Something happened!</Text>
    <Text style={styles.descriptionStyle}>{props.error.toString()}</Text>
    <ButtonGradient onPress={props.resetError} title={'Try again'} />
  </SafeContainer>
);

export default memo(ErrorComponent);
