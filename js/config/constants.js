let config = {
  apiUrl: 'https://api.dev.nightguide.app',
  apiToken: 'token',
};

const devConfig = {
  apiUrl: 'http://192.168.2.23:8080',
  apiToken: 'token',
};

if (__DEV__) {
  // config = Object.assign(config, devConfig);
}

export default config;
