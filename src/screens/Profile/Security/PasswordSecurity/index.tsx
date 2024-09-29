import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import Button from '@components/buttons/Button';

import {setAppPassword} from '@store/app/actions';

import styles from './styles';

const ButtonRound = ({
  label,
  onPress,
}: {
  label: string;
  onPress: (value: string) => void;
}) => {
  const onItemPress = () => onPress(label);
  return (
    <TouchableOpacity style={styles.btnContainerStyle} onPress={onItemPress}>
      <Text type="t2">{label}</Text>
    </TouchableOpacity>
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

export default function PasswordSecurity({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isFirstPasswordSet, setIsFirstPasswordSet] = useState(false);
  const [isNextStepValid, setValidNextStep] = useState(false);
  const [isPasswordsValid, setIsPasswordsValid] = useState(false);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onEnterPassword = (value: string) => {
    if (isFirstPasswordSet) {
      if (repeatPassword.length === 6) {
        return;
      }
      setRepeatPassword(repeatPassword + value);
    } else {
      if (password.length === 6) {
        return;
      }
      setPassword(password + value);
    }
  };

  const onDelete = () => {
    try {
      if (isFirstPasswordSet) {
        const newPassword = repeatPassword.slice(0, repeatPassword.length - 1);
        setRepeatPassword(newPassword);
      } else {
        const newPassword = password.slice(0, password.length - 1);
        setPassword(newPassword);
      }
    } catch (e) {
      console.log('[ERROR]: Nothing to delete');
    }
  };

  const onNext = () => setIsFirstPasswordSet(true);

  const onSubmit = () => {
    if (isPasswordsValid) {
      dispatch(setAppPassword(password));
      navigation.goBack();
    }
  };

  const onBack = () => {
    setIsFirstPasswordSet(false);
    setPassword('');
    setRepeatPassword('');
  };

  useEffect(() => {
    setValidNextStep(password.length >= 4 && password.length <= 6);
  }, [password]);

  useEffect(() => {
    setIsPasswordsValid(
      password === repeatPassword &&
        password.length >= 4 &&
        password.length <= 6,
    );
  }, [password, repeatPassword]);

  return (
    <SafeContainer>
      <View style={styles.passwordContainerStyle}>
        <Text textAlign="center" type="textRegular">
          {isFirstPasswordSet
            ? t('input.label_repeat_password')
            : t('input.label_password')}
        </Text>

        <TextInput
          secureTextEntry={true}
          value={isFirstPasswordSet ? repeatPassword : password}
          style={styles.inputStyle}
        />
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
        {isFirstPasswordSet ? (
          <View>
            <Button
              disabled={!isPasswordsValid}
              title={t('common.confirm')}
              onPress={onSubmit}
              containerStyle={styles.btnSubmitContainerStyle}
            />
            <Button
              title={t('common.back')}
              buttonContainerStyle={styles.btnCancelContainerStyle}
              onPress={onBack}
            />
          </View>
        ) : (
          <Button
            disabled={!isNextStepValid}
            title={t('common.next_step')}
            containerStyle={styles.btnNextContainerStyle}
            onPress={onNext}
          />
        )}
      </View>
    </SafeContainer>
  );
}
