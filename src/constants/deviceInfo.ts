import {Dimensions, Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const {width, height} = Dimensions.get('window');

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
