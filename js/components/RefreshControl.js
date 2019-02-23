import React from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';

import S from '../config/styles';

const RefreshControl = props => {
  return <RNRefreshControl tintColor={S.colors.loaderColor} {...props} />;
};

export default RefreshControl;
