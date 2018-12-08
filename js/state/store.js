import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customMiddleware from './middleware';
import sagas from './sagas';
import rootReducer from './app';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-undef

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, ...customMiddleware))
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
