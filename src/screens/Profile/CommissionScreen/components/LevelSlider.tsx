import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import {useTranslation} from 'react-i18next';

/**
 * Scale the next level
 * @param {object} fees
 */
const LevelSlider = ({fees}: any) => {
  const {t} = useTranslation();
  const maximumTrackTintColor = EStyleSheet.value('$white10');
  const minimumTrackTintColor = EStyleSheet.value('$primaryMain');
  const white = EStyleSheet.value('$white');

  const sliderStyle = {
    slider: {
      marginVertical: 10,
    },
    thumbStyle: {
      backgroundColor: white,
      borderWidth: 3,
      borderColor: minimumTrackTintColor,
    },
  };

  return (
    <View style={styles.container}>
      <Text>
        {`${fees.current_level_amount_face} / ${fees.next_level_amount}`}
      </Text>
      <Slider
        containerStyle={sliderStyle.slider}
        disabled
        value={fees.current_level_amount_face}
        minimumValue={0}
        maximumValue={fees.next_level_amount}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        thumbStyle={sliderStyle.thumbStyle}
      />
      <Row containerStyle={styles.leftBlock}>
        <Text style={styles.label}>{t('dashboard.next_level_left')}: </Text>
        <Text style={styles.leftAmount}>{fees.left_amount} </Text>
        <Text style={styles.label}>BTC</Text>
      </Row>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '$white5',
    padding: 10,
  },
  leftAmount: {
    color: '$primaryMain',
  },
  leftBlock: {
    flexWrap: 'wrap',
  },
  label: {
    color: '$white50',
  },
});

export default LevelSlider;
