import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestRequest: ['requestId'],
  requestAllRequest: ['options'],
  requestUpdateRequest: ['request'],
  requestDeleteRequest: ['requestId'],

  requestSuccess: ['request'],
  requestAllSuccess: ['requestList', 'headers'],
  requestUpdateSuccess: ['request'],
  requestDeleteSuccess: [],

  requestFailure: ['error'],
  requestAllFailure: ['error'],
  requestUpdateFailure: ['error'],
  requestDeleteFailure: ['error'],

  requestReset: [],
});

export const RequestTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  request: { id: undefined },
  requestList: [],
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
    request: INITIAL_STATE.request,
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
  const { request } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    request,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { requestList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    requestList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { request } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    request,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    request: INITIAL_STATE.request,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    request: INITIAL_STATE.request,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    requestList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    request: state.request,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    request: state.request,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_REQUEST]: request,
  [Types.REQUEST_ALL_REQUEST]: allRequest,
  [Types.REQUEST_UPDATE_REQUEST]: updateRequest,
  [Types.REQUEST_DELETE_REQUEST]: deleteRequest,

  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_ALL_SUCCESS]: allSuccess,
  [Types.REQUEST_UPDATE_SUCCESS]: updateSuccess,
  [Types.REQUEST_DELETE_SUCCESS]: deleteSuccess,

  [Types.REQUEST_FAILURE]: failure,
  [Types.REQUEST_ALL_FAILURE]: allFailure,
  [Types.REQUEST_UPDATE_FAILURE]: updateFailure,
  [Types.REQUEST_DELETE_FAILURE]: deleteFailure,
  [Types.REQUEST_RESET]: reset,
});
