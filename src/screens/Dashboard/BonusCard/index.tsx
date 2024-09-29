import React, {useCallback, useMemo} from 'react';
import {Pressable, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';

import {ClockIcon, CompletedIcon, WarnIcon} from '@assets/svgs/others';
import {selectUser, selectUserVerificationStatus} from '@store/auth';
import {selectBonusAccount} from '@store/bonusAccount/selectors';
import ButtonGradient from '@components/buttons/ButtonGradient';
import CountDown from '@components/CountDown';
import Text from '@components/textes/Text';
import {scaledSize} from '@utils/scaledSize';
import st from './styles';

type Props = {
  hideButton?: boolean;
};

const BonusCard = ({hideButton}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {is_verified} = useSelector(selectUser);
  const {balance, balanceInUSD, currencyCode, expirationDate} =
    useSelector(selectBonusAccount);
  const verificationStatus = useSelector(selectUserVerificationStatus);

  const handlePress = () => {
    if (is_verified || verificationStatus === 'completed') {
      navigation.navigate('Ecomining');
    } else {
      navigation.navigate('VerificationProfile');
    }
  };

  const renderTextByStatus = useCallback(() => {
    if (is_verified || verificationStatus === 'completed') {
      return (
        <>
          <CompletedIcon />
          <Text style={st.bottomText}>{t('bonus.verification_passed')}</Text>
        </>
      );
    }

    if (verificationStatus === 'process') {
      return (
        <>
          <ClockIcon />
          <Text style={st.bottomText}>
            {t('bonus.wait_end_of_check_verification')}
          </Text>
        </>
      );
    }

    return (
      <>
        <WarnIcon />
        <Text style={st.bottomText}>
          {t('bonus.verification_to_use_bonuses')}
        </Text>
      </>
    );
  }, []);

  const buttonTitle = useMemo(() => {
    let text = t('common.pass_verification');

    if (is_verified || ['completed', 'process'].includes(verificationStatus)) {
      text = t('invest_mn.send_to_masternode');
    }

    return text;
  }, [is_verified, verificationStatus]);

  const isButtonActive = useMemo(() => {
    return is_verified || verificationStatus !== 'process';
  }, [verificationStatus, is_verified]);

  return (
    <Pressable
      style={st.container}
      onPress={() => {
        navigation.navigate('BonusAccountScreen');
      }}>
      <LinearGradient
        colors={[
          'rgba(65, 65, 91, 1)',
          'rgba(40, 40, 56, 1)',
          'rgba(45, 45, 65, 1)',
        ]}
        locations={[0, 0.38, 0.84]}
        {...deg(155)}>
        <View style={{padding: scaledSize(20)}}>
          <Text type={'t3'}>{t('common.bonus_account')}</Text>
          <View style={st.bonusAmount}>
            <Text type={'t4'} style={st.greenText}>
              {balance || 0} {currencyCode}
            </Text>
            <Text type={'t4'} style={st.secondaryText}>
              ≈ ${balanceInUSD || 0}
            </Text>
          </View>
          <CountDown
            expirationDate={expirationDate}
            text={t('date_time.expires_in')}
            textStyle={st.secondaryText}
          />

          <View style={st.bottomRow}>{renderTextByStatus()}</View>
        </View>
        {!hideButton && (
          <ButtonGradient
            containerStyle={st.button}
            disableType={'opacity'}
            disabled={!isButtonActive}
            title={buttonTitle}
            onPress={handlePress}
            disabledGradientColors={['#00FF75', '#0075FF']}
            gradientColors={['#00FF75', '#0075FF']}
          />
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default BonusCard;
