import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reclRepRequest: ['reclRepId'],
  reclRepAllRequest: ['options'],
  reclRepUpdateRequest: ['reclRep'],
  reclRepDeleteRequest: ['reclRepId'],

  reclRepSuccess: ['reclRep'],
  reclRepAllSuccess: ['reclRepList', 'headers'],
  reclRepUpdateSuccess: ['reclRep'],
  reclRepDeleteSuccess: [],

  reclRepFailure: ['error'],
  reclRepAllFailure: ['error'],
  reclRepUpdateFailure: ['error'],
  reclRepDeleteFailure: ['error'],

  reclRepReset: [],
});

export const ReclRepTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  reclRep: { id: undefined },
  reclRepList: [],
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
    reclRep: INITIAL_STATE.reclRep,
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
  const { reclRep } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    reclRep,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { reclRepList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    reclRepList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { reclRep } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    reclRep,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    reclRep: INITIAL_STATE.reclRep,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    reclRep: INITIAL_STATE.reclRep,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    reclRepList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    reclRep: state.reclRep,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    reclRep: state.reclRep,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECL_REP_REQUEST]: request,
  [Types.RECL_REP_ALL_REQUEST]: allRequest,
  [Types.RECL_REP_UPDATE_REQUEST]: updateRequest,
  [Types.RECL_REP_DELETE_REQUEST]: deleteRequest,

  [Types.RECL_REP_SUCCESS]: success,
  [Types.RECL_REP_ALL_SUCCESS]: allSuccess,
  [Types.RECL_REP_UPDATE_SUCCESS]: updateSuccess,
  [Types.RECL_REP_DELETE_SUCCESS]: deleteSuccess,

  [Types.RECL_REP_FAILURE]: failure,
  [Types.RECL_REP_ALL_FAILURE]: allFailure,
  [Types.RECL_REP_UPDATE_FAILURE]: updateFailure,
  [Types.RECL_REP_DELETE_FAILURE]: deleteFailure,
  [Types.RECL_REP_RESET]: reset,
});
