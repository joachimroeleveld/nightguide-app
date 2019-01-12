import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

export const SET_LOCATION = 'SET_LOCATION';

export const { setLocation } = createActions(SET_LOCATION);

export default handleActions(
  {
    [setLocation]: (state, action) =>
      update(state, {
        currentLocation: {
          longitude: { $set: action.payload.longitude },
          latitude: { $set: action.payload.latitude },
          accuracy: { $set: action.payload.accuracy },
        },
      }),
  },
  {
    currentLocation: {
      longitude: null,
      latitude: null,
      accuracy: null,
    },
  }
);
