module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@validations': './src/validations',
          '@providers': './src/providers',
          '@helpers': './src/helpers',
          '@services': './src/services',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes', '__detectObjects', '__scanFaces'],
      },
    ],
  ],
};
