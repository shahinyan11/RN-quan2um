import React from 'react';
import {Platform, Linking} from 'react-native';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';
import appInfo from '@constants/appInfo';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Component witch inform about to update app
 */
const NeedUpdateApp = () => {
  const platformLink =
    Platform.OS === 'ios' ? appInfo.LINK_IOS : appInfo.LINK_ANDROID;

  const updateApp = async () => {
    await Linking.openURL(platformLink);
  };

  return (
    <SafeContainer>
      <Row justifyContent="space-evenly" containerStyle={styles.row}>
        <Text textAlign="center">
          To use this application you need to update it. Please, tap the button
          to redirect to the Store
        </Text>
        <Text textAlign="center">
          To use this app please update to a latest version.
        </Text>
        <Text textAlign="center">
          Please update to a more recent version for the full experience.
        </Text>
        <Button title="update app" onPress={updateApp} />
      </Row>
    </SafeContainer>
  );
};

const styles = EStyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
});

export default NeedUpdateApp;
