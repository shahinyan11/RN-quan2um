import ButtonGradient from '@components/buttons/ButtonGradient';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Text from '@components/textes/Text';
import {formatDate} from '@utils/fns';
import {scaledSize} from '@utils/scaledSize';
import React, {useEffect, useRef, useState} from 'react';
import {Linking, View} from 'react-native';
import PopoverInfo from '../Popover';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {secondsToDhms} from '@utils/secondsToDhms';

interface DetailsCustomProps {
  name: string;
  code: string;
  address: string;
  depositFace: string;
  depositBonusFace: string;
  rewardFace: string;
  feeFace: string;
  profitFace: string;
  startedAt?: any;
  withdrawalAt?: any;
  canWithdrawal: boolean;
  currency?: any;
  onPress?: () => void;
  onEnd?: () => void;
}
const TIMER_INTERVAL = 1000;
function DetailsCard({
  name,
  code,
  address,
  depositFace,
  depositBonusFace,
  rewardFace,
  feeFace,
  profitFace,
  canWithdrawal,
  startedAt,
  withdrawalAt,
  currency,
  onPress,
  onEnd,
}: DetailsCustomProps) {
  const {t} = useTranslation();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // set time left
  const setTimeLeftData = () => {
    const withdrawDate: any = new Date(formatDate(withdrawalAt));
    const time = withdrawDate - Date.now();
    if (time <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeLeft(time);
      if (onEnd) onEnd();

      return;
    }

    setTimeLeft(time);
  };

  const getDate = (time: number) => {
    const data = secondsToDhms(time);

    const {d, h, m, s} = data;
    const day = t('date_time.day').slice(0, 1);
    const hour = t('date_time.hour').slice(0, 1);
    const minute = t('date_time.minute').slice(0, 1);
    const second = t('date_time.second').slice(0, 1);

    return `  ${d}${day}: ${h}${hour}: ${m}${minute}: ${s}${second}`;
  };

  useEffect(() => {
    setTimeLeftData();
    const timer = setInterval(() => {
      setTimeLeftData();
    }, TIMER_INTERVAL);

    timerRef.current = timer;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const currencyUpperLowerCase = () => {
    const _begin = currency.toUpperCase();
    const _last = _begin.slice(-1).toLowerCase();
    const _currency = _begin.slice(0, -1) + _last;
    return _currency;
  };

  return (
    <View style={styles.container}>
      <Text type="textMiddle" style={styles.label}>
        {`${name}  ${code}`}
      </Text>
      <Row>
        <Text
          type="tTiny"
          style={styles.subLabelLink}
          onPress={() => {
            Linking.openURL(
              `https://btca.cryptoscope.io/address/?address=${address}`,
            );
          }}>
          {address}
        </Text>
        <Text
          onPress={() => {
            Linking.openURL(
              `https://btca.cryptoscope.io/address/?address=${address}`,
            );
          }}>
          <Icon
            containerStyle={styles.shareIcon}
            name={'_blank'}
            size={24}
            color={'#B8B8B8'}
          />
        </Text>
      </Row>
      <View style={styles.cardContainerStyle}>
        <Row containerStyle={styles.rowContainerStyle}>
          <Text type="textRegular" style={styles.textContext}>
            {t('invest_mn.investements_deposit')}:
          </Text>
          <Row containerStyle={{alignItems: 'flex-end'}}>
            <Text type="textRegular" style={styles.balanceText}>
              {depositFace}
            </Text>
            <Text type="textRegular" style={styles.mininalText}>
              {currencyUpperLowerCase()}
            </Text>
          </Row>
        </Row>
        <Row containerStyle={styles.rowContainerStyle}>
          <Row containerStyle={{alignItems: 'center'}}>
            <Text type="textRegular" style={styles.textContext}>
              {t('invest_mn.investements_bonus_deposit')}:
            </Text>
            <PopoverInfo
              containerStyle={{
                paddingLeft: scaledSize(1),
                paddingRight: scaledSize(2),
              }}
              description={t('invest_mn.bonus_popover')}
            />
          </Row>
          <Row containerStyle={{alignItems: 'flex-end'}}>
            <Text type="textRegular" style={styles.balanceText}>
              {depositBonusFace}
            </Text>

            <Text type="textRegular" style={styles.mininalText}>
              {currencyUpperLowerCase()}
            </Text>
          </Row>
        </Row>
        {/* divisor */}
        <View style={[styles.divisorLine]} />
        <View>
          <Row containerStyle={styles.rowContainerStyle}>
            <Text type="textRegular" style={styles.textContext}>
              {t('common.reward')}:
            </Text>
            <Row>
              <Text type="textRegular" style={{paddingLeft: scaledSize(4)}}>
                {rewardFace}
              </Text>
              <Text type="textRegular" style={styles.mininalText}>
                {currencyUpperLowerCase()}
              </Text>
            </Row>
          </Row>
          <Row containerStyle={styles.rowContainerStyle}>
            <Text type="textRegular" style={styles.textContext}>
              {t('common.fee')}:
            </Text>
            <Row>
              <Text type="textRegular" style={styles.redHightLightedText}>
                -{feeFace}
              </Text>
              <Text type="textRegular" style={styles.mininalText}>
                {currencyUpperLowerCase()}
              </Text>
            </Row>
          </Row>
        </View>
        {/* divisor */}
        <View style={[styles.divisorLine]} />
        <View>
          <Row>
            <Text type="textRegular" style={styles.textContext}>
              {t('common.profit')}:
            </Text>
            <Row containerStyle={{alignItems: 'flex-end'}}>
              <Text type="textRegular" style={styles.greenHightLightedText}>
                {profitFace}
              </Text>
              <Text type="textRegular" style={styles.mininalText}>
                {currencyUpperLowerCase()}
              </Text>
            </Row>
          </Row>
        </View>
        {!canWithdrawal ? (
          <ButtonGradient
            title={`${t('invest_mn.outcome_deposit')}${getDate(timeLeft)}`}
            disabled={true}
            onPress={() => {}}
            titleStyle={styles.butttonTitleStyle}
            disableGradientLinear={true}
            disabledTitleStyleLinear={styles.disabledTitleStyle}
          />
        ) : (
          <ButtonGradient
            gradientColors={['#0094FF', '#8995FF']}
            title={t('invest_mn.outcome_go')}
            onPress={onPress}
            titleStyle={{fontSize: scaledSize(12)}}
          />
        )}
      </View>
    </View>
  );
}

export default DetailsCard;
