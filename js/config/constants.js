let config = {
  apiUrl: 'https://api.dev.nightguide.app',
  apiToken: 'token',
  sentryDsn: 'https://11fec49290754c04a4090c5a5f7394c1@sentry.io/1400408',
};

const devConfig = {
  apiUrl: 'http://192.168.2.23:8080',
  apiToken: 'token',
};

if (__DEV__) {
  config = Object.assign(config, devConfig);
}

export default config;
