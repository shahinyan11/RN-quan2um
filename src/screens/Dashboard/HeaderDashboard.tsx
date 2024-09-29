import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import useFetch from '@hooks/useFetch';
import {ACCOUNT_NOTIFICATIONS_UNREAD} from '@api';
import Row from '@components/containers/Row';
import styles from '@screens/Dashboard/styles';
import Icon from '@components/icons/Icon';
import {View} from 'react-native';
import {scaledSize} from '@utils/scaledSize';

const ICON_SIZE = scaledSize(21);

const HeaderDashboard = ({isAuth}: {isAuth: boolean}) => {
  const navigation = useNavigation();

  const {response, refresh} = useFetch(
    {
      url: ACCOUNT_NOTIFICATIONS_UNREAD,
    },
    isAuth,
  );

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      refresh();
    });

    return focusListener;
  }, [navigation, refresh]);

  const onSearch = () => navigation.navigate('Market');

  const onPressBell = () => navigation.navigate('Notifications');

  const onProfile = () => navigation.navigate('Profile');

  // const handlePressIcon = () => {
  //   navigation.navigate('LoginScanner');
  // };

  return (
    <Row
      justifyContent="space-between"
      containerStyle={styles.headerContainerStyle}>
      <Row>
        {isAuth && (
          <Icon
            disabled={false}
            name="user-outline"
            size={ICON_SIZE}
            containerStyle={styles.iconContainerStyle}
            onPress={onProfile}
          />
        )}
        <Icon
          disabled={false}
          name="search"
          size={ICON_SIZE}
          containerStyle={styles.iconContainerStyle}
          onPress={onSearch}
        />
      </Row>
      {isAuth && (
        <Row>
          {/*<Icon*/}
          {/*  disabled={false}*/}
          {/*  name="qr-scanner"*/}
          {/*  size={ICON_SIZE}*/}
          {/*  containerStyle={styles.iconContainerStyle}*/}
          {/*  onPress={handlePressIcon}*/}
          {/*/>*/}
          <View>
            {/*{Boolean(response?.total) && (*/}
            {/*  <View style={styles.haveUnreadMessages} />*/}
            {/*)}*/}
            <Icon
              disabled={false}
              name="bell"
              size={ICON_SIZE}
              containerStyle={styles.iconContainerStyle}
              onPress={onPressBell}
            />
          </View>
        </Row>
      )}
    </Row>
  );
};

export default HeaderDashboard;
