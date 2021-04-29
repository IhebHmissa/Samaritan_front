import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  historyLineRequest: ['historyLineId'],
  historyLineAllRequest: ['options'],
  historyLineUpdateRequest: ['historyLine'],
  historyLineDeleteRequest: ['historyLineId'],

  historyLineSuccess: ['historyLine'],
  historyLineAllSuccess: ['historyLineList', 'headers'],
  historyLineUpdateSuccess: ['historyLine'],
  historyLineDeleteSuccess: [],

  historyLineFailure: ['error'],
  historyLineAllFailure: ['error'],
  historyLineUpdateFailure: ['error'],
  historyLineDeleteFailure: ['error'],

  historyLineReset: [],
});

export const HistoryLineTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  historyLine: { id: undefined },
  historyLineList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    historyLine: INITIAL_STATE.historyLine,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { historyLine } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    historyLine,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { historyLineList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    historyLineList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { historyLine } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    historyLine,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    historyLine: INITIAL_STATE.historyLine,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    historyLine: INITIAL_STATE.historyLine,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    historyLineList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    historyLine: state.historyLine,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    historyLine: state.historyLine,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HISTORY_LINE_REQUEST]: request,
  [Types.HISTORY_LINE_ALL_REQUEST]: allRequest,
  [Types.HISTORY_LINE_UPDATE_REQUEST]: updateRequest,
  [Types.HISTORY_LINE_DELETE_REQUEST]: deleteRequest,

  [Types.HISTORY_LINE_SUCCESS]: success,
  [Types.HISTORY_LINE_ALL_SUCCESS]: allSuccess,
  [Types.HISTORY_LINE_UPDATE_SUCCESS]: updateSuccess,
  [Types.HISTORY_LINE_DELETE_SUCCESS]: deleteSuccess,

  [Types.HISTORY_LINE_FAILURE]: failure,
  [Types.HISTORY_LINE_ALL_FAILURE]: allFailure,
  [Types.HISTORY_LINE_UPDATE_FAILURE]: updateFailure,
  [Types.HISTORY_LINE_DELETE_FAILURE]: deleteFailure,
  [Types.HISTORY_LINE_RESET]: reset,
});
