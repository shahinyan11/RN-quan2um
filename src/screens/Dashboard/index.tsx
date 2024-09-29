import React, {useCallback, useEffect, useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Image, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import SafeContainer from '@components/containers/SafeContainer';
import Slider from '@components/other/Slider';
import Text from '@components/textes/Text';
import ContainerItem from '@components/containers/ContainerItem';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {selectIsAuth, selectUser} from '@store/auth';
import styles from './styles';

import {ISocketPair} from '@store/tradeview';
import HeaderDashboard from './HeaderDashboard';
import {
  getHomePage,
  getHomePageSlides,
  getMarketData,
  onUpdateCurrenciesHome,
} from '@store/market/action';
import {selectHomePageSlides} from '@store/market/selectors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Sockets from '@utils/sockets';
import useAppState from '@hooks/useAppState';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';
import {getBonusAccount} from '@store/bonusAccount/apiCalls';
import BonusCard from '@screens/Dashboard/BonusCard';
import {
  imageExchange,
  imageMasterNode,
  imageMasterNodeX10,
  imageReferral,
} from '@assets/images/svgXml';
import {SvgXml} from 'react-native-svg';
import {girlFrame} from '@constants/images';
import {getTestQuestionStatus} from '@store/charity';

function Dashboard() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const appStateVisible = useAppState();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const homePageSlides = useSelector(selectHomePageSlides);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (appStateVisible.match(/active/)) {
        Sockets.subscribes('prices');
        Sockets.listen<ISocketPair>('prices', ({data}) => {
          dispatch(onUpdateCurrenciesHome(data));
        });
      }

      return () => {
        Sockets.unsubscribes('prices');
        Sockets.listenOff('prices');
      };
    }, [isLoading, appStateVisible]),
  );

  const onPressVerification = () => {
    navigation.navigate('VerificationProfile');
  };

  useEffect(() => {
    initScreen();

    const unsubscribe = navigation.addListener('focus', initScreen);

    if (isAuth) {
      dispatch(getTestQuestionStatus({appInit: true}));
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (appStateVisible.match(/active/)) {
      dispatch(getHomePage());
    }
  }, [appStateVisible]);

  const initScreen = async () => {
    await Promise.all([
      dispatch(
        getMarketData({
          filter: '',
          type: 'all',
        }),
      ),
      dispatch(getHomePage()),
      dispatch(getHomePageSlides()),
      isAuth && dispatch(getBonusAccount()),
    ]);

    setIsLoading(false);
  };

  const handleMasterNodesClick = () => {
    navigation.navigate(isAuth ? 'MasternodesScreen' : 'Auth');
  };

  const handleReferralsClick = () => {
    navigation.navigate(isAuth ? 'ReferralProgramScreen' : 'Auth');
  };

  const handleExchangeClick = () => {
    navigation.navigate(isAuth ? 'Exchange' : 'Auth');
  };

  return (
    <SafeContainer containerStyle={styles.containerStyle} loading={isLoading}>
      <HeaderDashboard isAuth={isAuth} />
      <SafeScrollContainer>
        <Slider data={homePageSlides} />
        <View style={styles.secondContainer}>
          {isAuth && !user.is_verified && (
            <ContainerItem>
              <Text type="t4">{t('verify_user.main_title')}</Text>
              <Text type="textSmall" style={styles.hintStyle}>
                {t('verify_user.m_main_description')}
              </Text>
              <ButtonGradient
                title={t('verify_user.m_verify')}
                onPress={onPressVerification}
              />
            </ContainerItem>
          )}

          {isAuth && <BonusCard hideButton />}

          <Pressable
            onPress={() => navigation.navigate(isAuth ? 'Ecomining' : 'Auth')}>
            <LinearGradient
              style={styles.gradientCardWide}
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(92, 255, 243, 0)',
                'rgba(92, 255, 243, 0.15)',
              ]}
              {...deg(134)}>
              <SvgXml xml={imageMasterNode} style={styles.frameImg} />
              <Text type={'t4'}>{t('common.masternodes')}</Text>
              <Text type={'t6'} style={styles.cardText}>
                <Trans
                  i18nKey={'referral.without_additional_conditions'}
                  components={{span: <Text style={{color: '#00D89D'}} />}}
                />
              </Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Charity');
            }}>
            <LinearGradient
              style={styles.charityCard}
              colors={[
                'rgba(95, 255, 92, 0.15)',
                'rgba(92, 255, 243, 0)',
                'rgba(95, 255, 92, 0)',
                'rgba(255, 255, 255, 0.1)',
              ]}
              {...deg(134)}>
              <View style={{flex: 1}}>
                <Text type={'t4'} style={{marginVertical: 10}}>
                  {t('charity.charity_funds')}
                </Text>
                <Text type={'t6'}>
                  {t('referral.we_support_115_charitable_organizations')}
                </Text>
              </View>
              <Image style={styles.charityImg} source={girlFrame} />
            </LinearGradient>
          </Pressable>

          <View style={styles.cardRow}>
            <Pressable onPress={handleReferralsClick}>
              <LinearGradient
                style={styles.gradientCardNarrow}
                colors={[
                  'rgba(0, 190, 216, 0.15)',
                  'rgba(0, 190, 216, 0)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                {...deg(135)}>
                <SvgXml
                  xml={imageReferral}
                  style={{position: 'absolute', bottom: 0}}
                />
                <Text type={'t4'}>{t('referral.referral_program')}</Text>
                <Text type={'t6'} style={styles.cardText}>
                  {t('referral.invite_friends')}
                </Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={handleExchangeClick}>
              <LinearGradient
                style={styles.gradientCardNarrow}
                colors={[
                  'rgba(252, 194, 36, 0.15)',
                  'rgba(252, 194, 36, 0)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                {...deg(135)}>
                <SvgXml
                  xml={imageExchange}
                  style={{position: 'absolute', bottom: 0, right: 0}}
                />
                <Text type={'t4'}>{t('exchange.convenient_exchange')}</Text>
                <Text type={'t6'} style={styles.cardText}>
                  {t('referral.exchange_top_coins')}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
          <Pressable onPress={handleMasterNodesClick}>
            <LinearGradient
              style={styles.gradientCardWide}
              colors={[
                'rgba(134, 28, 161, 0.15)',
                'rgba(134, 28, 161, 0)',
                'rgba(255, 255, 255, 0.1)',
              ]}
              {...deg(134)}>
              <SvgXml
                xml={imageMasterNodeX10}
                style={[styles.frameImg, {alignSelf: 'flex-end'}]}
              />

              <Text type={'t4'}>{t('common.master_nodes_x10')}</Text>
              <Text type={'t6'} style={styles.cardText}>
                {t('referral.no_risk_to_own')}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeScrollContainer>
    </SafeContainer>
  );
}

export default Dashboard;
