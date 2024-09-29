import React, {useEffect, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import Button from '@components/buttons/Button';

import styles from './styles';
import {selectAppPassword, setSecurePassword} from '@store/app';

const ButtonRound = ({
  label,
  onPress,
}: {
  label: string;
  onPress: (value: string) => void;
}) => {
  const onItemPress = () => onPress(label);
  return (
    <Pressable style={styles.btnContainerStyle} onPress={onItemPress}>
      <Text type="t2">{label}</Text>
    </Pressable>
  );
};

const ButtonIcon = ({
  iconName,
  onPress,
}: {
  iconName: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.btnContainerStyle} onPress={onPress}>
      <Icon name={iconName} />
    </TouchableOpacity>
  );
};

interface IPasswordSecureScreenVisible {
  onSuccess: (data: boolean) => void;
}

export default function PasswordSecurityScreen({
  onSuccess,
}: IPasswordSecureScreenVisible) {
  const {t} = useTranslation();
  const appPassword = useSelector(selectAppPassword);
  const dispatch = useDispatch();

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState('');

  const onEnterPassword = (value: string) => {
    if (password.length === 6) {
      return;
    }
    setPassword(password + value);
  };

  const onDelete = () => {
    try {
      const newPassword = password.slice(0, password.length - 1);
      setPassword(newPassword);
    } catch (e) {
      console.log('[ERROR]: Nothing to delete');
    }
  };

  const onSubmit = () => {
    onSuccess(!(password === appPassword));

    if (password !== appPassword) {
      setErrorVisible(true);
    } else {
      dispatch(setSecurePassword(true));
    }
  };

  useEffect(() => {
    setIsPasswordValid(password.length <= 6 && password.length >= 4);
  }, [password]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <View style={styles.passwordContainerStyle}>
        <Text textAlign="center" type="textRegular">
          {t('input.label_password')}
        </Text>

        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.inputStyle}
        />

        {isErrorVisible && (
          <Text
            type="textSmall"
            textAlign="center"
            style={styles.errorTitleStyle}>
            {t('common.m_password_incorrect')}
          </Text>
        )}
      </View>
      <View style={styles.controlContainerStyle}>
        <View>
          <Row
            justifyContent="center"
            containerStyle={styles.rowContainerStyle}>
            <ButtonRound label="1" onPress={onEnterPassword} />
            <ButtonRound label="2" onPress={onEnterPassword} />
            <ButtonRound label="3" onPress={onEnterPassword} />
          </Row>
          <Row
            justifyContent="center"
            containerStyle={styles.rowContainerStyle}>
            <ButtonRound label="4" onPress={onEnterPassword} />
            <ButtonRound label="5" onPress={onEnterPassword} />
            <ButtonRound label="6" onPress={onEnterPassword} />
          </Row>
          <Row
            justifyContent="center"
            containerStyle={styles.rowContainerStyle}>
            <ButtonRound label="7" onPress={onEnterPassword} />
            <ButtonRound label="8" onPress={onEnterPassword} />
            <ButtonRound label="9" onPress={onEnterPassword} />
          </Row>
          <Row
            justifyContent="center"
            containerStyle={styles.rowContainerStyle}>
            <View style={styles.btnContainerEmptyStyle} />
            <ButtonRound label="0" onPress={onEnterPassword} />
            <ButtonIcon iconName="delete" onPress={onDelete} />
          </Row>
        </View>

        <Button
          disabled={!isPasswordValid}
          title={t('common.confirm')}
          onPress={onSubmit}
          containerStyle={styles.btnSubmitContainerStyle}
        />
      </View>
    </SafeContainer>
  );
}
