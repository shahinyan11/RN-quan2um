declare module 'react-native-extended-stylesheet' {
  import {
    ImageStyle as RNImageStyle,
    StyleSheet,
    TextStyle as RNTextStyle,
    ViewStyle as RNViewStyle,
  } from 'react-native';

  // @ts-ignore
  import NamedStyles = StyleSheet.NamedStyles;
  type ExtraStyles<T> = {
    '@media android'?: ExtendedStyle<T>;
    '@media ios'?: ExtendedStyle<T>;
  };

  type ElementStyle<T> = ExtendedStyle<T> & ExtraStyles<T>;

  export type ExtendedStyle<T> = {
    [Q in keyof T]: any;
  };

  export type ViewStyle = ExtendedStyle<RNViewStyle>;
  export type TextStyle = ExtendedStyle<RNTextStyle>;
  export type ImageStyle = ExtendedStyle<RNImageStyle>;
  export type CustomStyleValues = ITheme;

  function value(expr: ITheme, prop?: string): any;

  type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

  function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T> | {[P in keyof T]: ElementStyle<T[P]>},
  ): {[P in keyof T]: RegisteredStyle<T[P]>};

  function build(rawGlobalVars: any): void;
}

type RegisteredStyle<T> = number & {__registeredStyleBrand: T};

/** Declare custom style values here */

type ITheme =
  | '$theme'
  | '$darkBlack'
  | '$blackBackground'
  | '$darkBackground'
  | '$darkForms'
  | '$darkShadow'
  | '$white'
  | '$white1'
  | '$white75'
  | '$white70'
  | '$white50'
  | '$white35'
  | '$white25'
  | '$white10'
  | '$white5'
  | '$primaryMain'
  | '$primaryFocus'
  | '$primary10'
  | '$gray'
  | '$blue'
  | '$blueText'
  | '$orange'
  | '$chartCyanStart'
  | '$chartCyanEnd'
  | '$chartOrangeStart'
  | '$chartOrangeEnd'
  | '$red'
  | '$red25'
  | '$green'
  | '$green25'
  | '$greenLight'
  | '$yellow'
  | '$yellow25'
  | '$gGreenStart'
  | '$gGreenEnd'
  | '$gCyanStart'
  | '$gCyanEnd'
  | '$gRedStart'
  | '$gRedEnd'
  | '$gLightCoinStart'
  | '$gLightCoinEnd'
  | '$gEthereumStart'
  | '$gEthereumEnd'
  | '$gYellowStart'
  | '$gYellowEnd'
  | '$gBlueStart'
  | '$gBlueEnd'
  | '$greenGradient'
  | '$cyanGradient'
  | '$greenBlueGradient'
  | '$regGradient'
  | '$silverGradient'
  | '$darkGradient'
  | '$yellowGradient'
  | '$blueGradient'
  | '$blackText'
  | '$greenBackground'
  | '$blackTextLight'
  | '$black12'
  | '$greenText'
  | '$black01';
