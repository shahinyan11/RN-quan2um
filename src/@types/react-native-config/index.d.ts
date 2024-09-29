declare module 'react-native-config' {
  interface Env {
    BASE_URL: 'string';
    GOOGLE_WEB_CLIENT: 'string';
    IOS_GOOGLE_WEB_CLIENT: 'string';
    SENTRY_DNS: 'string';
    BASE_URL_WS: 'string';
    CAPTCHA_KEY: 'string';
  }

  const BuildConfig: Env;

  export default BuildConfig;
}
