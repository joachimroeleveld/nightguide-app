let config = {
  apiUrl: 'https://nightguide.app/api',
};

const devConfig = {
  apiUrl: 'http://localhost:8080',
};

if (__DEV__) {
  config = Object.assign(config, devConfig);
}

export default config;
