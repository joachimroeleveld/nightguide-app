import { REHYDRATE } from 'redux-persist';

import { SET_ACCOUNT } from './account/actions';
import { initializeApp, INITIALIZE_APP } from './rootReducer';
import api from '../services/api';

function initAction({ dispatch }) {
  return next => action => {
    const returnValue = next(action);

    if (action.type === REHYDRATE) {
      dispatch(initializeApp());
    }

    return returnValue;
  };
}

function authenticateApi({ getState }) {
  return next => action => {
    const state = getState();

    if (action.type === SET_ACCOUNT) {
      api.setToken(action.payload.token);
    } else if (action.type === INITIALIZE_APP && state.account.token !== null) {
      api.setToken(state.account.token);
    }

    return next(action);
  };
}

export default [initAction, authenticateApi];
