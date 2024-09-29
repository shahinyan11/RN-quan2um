import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    marginBottom: 20,
  },
  containerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const htmlTagsStyle = {
  h1: {
    fontFamily: 'Ubuntu-Bold',
    color: 'rgba(255,255,255,0.75)',
    fontSize: scaledFontSize(20),
    marginVertical: 20,
  },
  p: {
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'justify',
    color: 'rgb(187,191,201)',
    fontSize: scaledFontSize(14),
  },
  div: {
    fontFamily: 'Ubuntu-Regular',
    color: 'rgb(187,191,201)',
    fontSize: scaledFontSize(14),
  },
  span: {
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'justify',
    color: 'rgb(187,191,201)',
    fontSize: scaledFontSize(14),
  },
  strong: {
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'justify',
    color: 'rgb(187,191,201)',
    fontSize: scaledFontSize(14),
  },
};

export default styles;
