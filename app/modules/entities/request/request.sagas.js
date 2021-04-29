import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import RequestActions from './request.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getRequest(api, action) {
  const { requestId } = action;
  // make the call to the api
  const apiCall = call(api.getRequest, requestId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(RequestActions.requestSuccess(response.data));
  } else {
    yield put(RequestActions.requestFailure(response.data));
  }
}

function* getAllRequests(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllRequests, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RequestActions.requestAllSuccess(response.data, response.headers));
  } else {
    yield put(RequestActions.requestAllFailure(response.data));
  }
}

function* updateRequest(api, action) {
  const { request } = action;
  // make the call to the api
  const idIsNotNull = !(request.id === null || request.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateRequest : api.createRequest, request);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(RequestActions.requestUpdateSuccess(response.data));
  } else {
    yield put(RequestActions.requestUpdateFailure(response.data));
  }
}

function* deleteRequest(api, action) {
  const { requestId } = action;
  // make the call to the api
  const apiCall = call(api.deleteRequest, requestId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(RequestActions.requestDeleteSuccess());
  } else {
    yield put(RequestActions.requestDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.timestamp = convertDateTimeFromServer(data.timestamp);
  return data;
}

export default {
  getAllRequests,
  getRequest,
  deleteRequest,
  updateRequest,
};
