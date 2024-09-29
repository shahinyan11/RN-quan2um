import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {t3, t5} from '@constants/globalStyles';
import {simpleTransparent} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  title: {
    ...t3,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(20),
    marginBottom: 12,
  },

  uploadsContainer: {
    marginTop: 49,
  },

  uploadButton: {
    ...simpleTransparent.container,
    marginTop: 2,
    marginBottom: 8,
  },
  uploadButtonText: {
    ...simpleTransparent.text,
  },

  filePermission: {
    ...t5,
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledFontSize(14),
    opacity: 0.5,
  },

  container: {
    padding: 12,
    height: 77,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderRadius: 5,
  },

  previewVideo: {
    width: 118,
    height: 118,
  },

  preview: {
    height: '100%',
    width: scaledSize(118),
    marginRight: 8,
    // resizeMode: 'stretch',
  },

  textBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconBox: {
    flexDirection: 'row',
    position: 'absolute',
    right: 12,
    top: 12,
  },
  mr12: {
    marginRight: 12,
  },
});

export default styles;
