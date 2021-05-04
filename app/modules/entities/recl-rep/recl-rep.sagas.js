import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ReclRepActions from './recl-rep.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getReclRep(api, action) {
  const { reclRepId } = action;
  // make the call to the api
  const apiCall = call(api.getReclRep, reclRepId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ReclRepActions.reclRepSuccess(response.data));
  } else {
    yield put(ReclRepActions.reclRepFailure(response.data));
  }
}

function* getAllReclReps(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllReclReps, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ReclRepActions.reclRepAllSuccess(response.data, response.headers));
  } else {
    yield put(ReclRepActions.reclRepAllFailure(response.data));
  }
}

function* updateReclRep(api, action) {
  const { reclRep } = action;
  // make the call to the api
  const idIsNotNull = !(reclRep.id === null || reclRep.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateReclRep : api.createReclRep, reclRep);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ReclRepActions.reclRepUpdateSuccess(response.data));
  } else {
    yield put(ReclRepActions.reclRepUpdateFailure(response.data));
  }
}

function* deleteReclRep(api, action) {
  const { reclRepId } = action;
  // make the call to the api
  const apiCall = call(api.deleteReclRep, reclRepId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ReclRepActions.reclRepDeleteSuccess());
  } else {
    yield put(ReclRepActions.reclRepDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.timestamp = convertDateTimeFromServer(data.timestamp);
  return data;
}

export default {
  getAllReclReps,
  getReclRep,
  deleteReclRep,
  updateReclRep,
};
