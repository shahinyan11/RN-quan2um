import React, {useRef} from 'react';
import {Platform, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import Share, {ShareOptions} from 'react-native-share';
import RNFS from 'react-native-fs';

import ContainerItem from '@components/containers/ContainerItem';
import Text from '@components/textes/Text';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 16,
  },
  titleStyle: {
    alignSelf: 'center',
  },
  btnContainerStyle: {
    alignSelf: 'center',
    paddingHorizontal: scaledSize(60),
  },
});

const QrCode = ({title = '', value}: {title: string; value: string}) => {
  const {t} = useTranslation();
  const qrImage = useRef().current;

  const onPressShare = () => {
    try {
      let FILE_PATH = `${RNFS.DocumentDirectoryPath}/wallet.png`;
      qrImage?.toDataURL(async (dataURL: string) => {
        if (Platform.OS === 'android') {
          FILE_PATH = `data:image/png;base64, ${dataURL}`;
        } else {
          await RNFS.writeFile(FILE_PATH, dataURL, 'base64');
        }

        const shareImageBase64: ShareOptions = {
          title: 'Quantum app wallet',
          message: `This is ${title}`,
          url: FILE_PATH,
          subject: 'BTC Addition wallet',
          failOnCancel: false,
        };

        Share.open(shareImageBase64);
      });
    } catch (e) {
      console.log('Share image error', e);
    }
  };

  const onSave = () => {
    try {
      let FILE_PATH = `${RNFS.DocumentDirectoryPath}/wallet.png`;
      qrImage?.toDataURL(async (dataURL: string) => {
        await RNFS.writeFile(FILE_PATH, dataURL, 'base64');
      });
    } catch (e) {
      console.log('Share image error', e);
    }
  };

  return value ? (
    <ContainerItem>
      <Text type="t6" style={styles.titleStyle}>
        {title}
      </Text>

      <View style={styles.containerStyle}>
        <QRCode value={value} size={200} quietZone={20} />
      </View>
    </ContainerItem>
  ) : null;
};

export default React.memo(QrCode);
