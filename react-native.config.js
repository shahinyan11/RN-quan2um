module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/', './src/assets/model/'],
  dependencies: {
    'vision-camera-realtime-object-detection': {
      platforms: {
        ios: null,
      },
    },
  },
};
