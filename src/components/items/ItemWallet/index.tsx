import React, {useRef, memo} from 'react';
import {View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import {WithdrawWallet} from '@store/account/types';
import {onWithdrawWalletDelete} from '@store/account';

import styles from './styles';
import Icon from '@components/icons/Icon';

interface IItemWalletProps extends WithdrawWallet {
  onPress: () => void;
}

const ItemWallet = React.memo(
  ({name, address, currency, id, onPress}: IItemWalletProps) => {
    const swipeableRef = useRef(undefined);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressUpdate = () => {
      try {
        swipeableRef.current?.close();
        navigation.navigate('WithdrawalWalletsOperations', {
          item: {name, address, currency, id},
          type: 'update',
        });
      } catch (e) {}
    };

    const onPressDelete = () => {
      try {
        swipeableRef.current?.close();
        dispatch(onWithdrawWalletDelete({ids: [id]}));
      } catch (e) {}
    };

    const RightContainer = () => (
      <View style={styles.backgroundOptions}>
        <ContainerItem
          disabled={false}
          onPress={onPressUpdate}
          containerStyle={styles.btnBlueContainerStyle}>
          <Icon name="pencil" />
        </ContainerItem>
        <ContainerItem
          disabled={false}
          onPress={onPressDelete}
          containerStyle={styles.btnRedContainerStyle}>
          <Icon name="close" />
        </ContainerItem>
      </View>
    );
    return (
      <Swipeable ref={swipeableRef} renderRightActions={RightContainer}>
        <ContainerItem disabled={false} onPress={onPress}>
          <Row>
            <Text type="t6">{name}</Text>
            <Text type="t6" style={styles.currencyTitleStyle}>
              ({currency})
            </Text>
          </Row>
          <Text type="textSmall" style={styles.subtitleStyle}>
            {address}
          </Text>
        </ContainerItem>
      </Swipeable>
    );
  },
);

export default memo(ItemWallet);
