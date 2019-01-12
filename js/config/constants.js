let config = {
  apiUrl: 'https://api.dev.nightguide.app',
  apiToken: '',
};

const devConfig = {
  apiUrl: 'http://localhost:8080',
  apiToken: 'token',
};

if (__DEV__) {
  config = Object.assign(config, devConfig);
}

export default config;
