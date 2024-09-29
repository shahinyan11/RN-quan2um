import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import {useTranslation} from 'react-i18next';
import {selectFees} from '@store/account/selectors';
import Row from '@components/containers/Row';
import PairsModal from './components/PairsModal';
import styles from './styles';
import FeesInfo from './components/FeesInfo';
import LevelSlider from './components/LevelSlider';
import {selectUser} from '@store/auth';

/**
 * Index screen
 */
const CommissionScreen = () => {
  const {t} = useTranslation();
  const feesData = useSelector(selectFees);
  const userInfo = useSelector(selectUser);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(feesData?.pair_fees[0]);
  }, [feesData]);

  const handleChangeValue = (pair: any) => {
    setValue(pair);
  };

  return (
    <SafeContainer loading={!value}>
      <Row alignItems="flex-end" containerStyle={styles.titleBlock}>
        <Text type="t4">{t('dashboard.fee_lavel')}: </Text>
        <Text type="t3" style={styles.vip}>
          {userInfo?.level_name}
        </Text>
      </Row>
      <PairsModal
        visible={visible}
        onClose={setVisible}
        value={value}
        onChangeValue={handleChangeValue}
        data={feesData?.pair_fees}
      />
      <FeesInfo fees={value} />
      <LevelSlider fees={feesData?.fees} />
    </SafeContainer>
  );
};

export default CommissionScreen;
