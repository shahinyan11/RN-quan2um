import React from 'react';
import {StyleProp, View} from 'react-native';
import HTML from 'react-native-render-html';

import {scaledFontSize, scaledSize} from '@utils/scaledSize';

const defaultHtmlStyles = {
  p: {
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'justify',
    color: 'rgba(255,255,255,0.5)',
    fontSize: scaledFontSize(14),
  },
};

const BASE_FONT_STYLE = {
  fontFamily: 'Ubuntu-Regular',
  textAlign: 'justify',
  color: 'rgba(255,255,255,0.5)',
  fontSize: scaledFontSize(14),
};

import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {},
});

const HtmlReader = ({
  data,
  containerStyle,
}: {
  data: string;
  containerStyle?: StyleProp<ViewStyle>;
}) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <HTML
      source={{html: data}}
      baseFontStyle={BASE_FONT_STYLE}
      tagsStyles={defaultHtmlStyles}
    />
  </View>
);

export default React.memo(HtmlReader);
