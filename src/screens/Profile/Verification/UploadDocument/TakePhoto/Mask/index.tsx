import React, {useMemo} from 'react';
import {Image, View} from 'react-native';
import st from './styles';
import docMask from '@assets/images/masks/doc.png';
import docMaskActive from '@assets/images/masks/docActive.png';
import faceMaskActive from '@assets/images/masks/faceMaskActive.png';
import faceMask from '@assets/images/masks/faceMask.png';

export default function Mask({isFit, isSelfie, onLayout}: any) {
  const url = useMemo(() => {
    if (isFit) {
      return isSelfie ? faceMaskActive : docMaskActive;
    }

    return isSelfie ? faceMask : docMask;
  }, [isFit, isSelfie]);

  return (
    <View style={st.container}>
      <View style={st.opacityView} />
      <View style={{flexDirection: 'row'}}>
        <View style={st.opacityView} />
        <Image
          onLayout={onLayout}
          style={isSelfie ? st.selfieMask : st.docMask}
          source={url}
        />
        <View style={st.opacityView} />
      </View>
      <View style={st.opacityView} />
    </View>
  );
}
