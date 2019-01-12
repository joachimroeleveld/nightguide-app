import { REHYDRATE } from 'redux-persist';

import { LOGOUT, SET_ACCOUNT, refreshAccount } from './account/actions';
import { initializeApp, INITIALIZE_APP } from './rootReducer';
import { persistor } from './store';
import api from '../services/api';
import { handleError } from '../services/errors';

export function handleErrors() {
  return next => action => {
    if (
      action.payload &&
      action.payload.__api_error__ &&
      !action.payload.__error_handled__
    ) {
      action.payload.__error_handled__ = true;
      handleError(action.payload);
    }

    let returnValue;
    try {
      returnValue = next(action);
    } catch (e) {
      handleError(e);
    }

    return returnValue;
  };
}

function initAction({ dispatch }) {
  return next => action => {
    const retVal = next(action);

    if (action.type === REHYDRATE) {
      dispatch(initializeApp());
    }

    return retVal;
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

function purgePersistorOnLogout() {
  return next => action => {
    if (action.type === LOGOUT) {
      persistor.purge();
    }

    return next(action);
  };
}

function refreshAccountOnInit({ dispatch }) {
  return next => action => {
    if (action.type === INITIALIZE_APP) {
      dispatch(refreshAccount());
    }

    return next(action);
  };
}

export default [
  handleErrors,
  initAction,
  authenticateApi,
  purgePersistorOnLogout,
  // refreshAccountOnInit,
];
