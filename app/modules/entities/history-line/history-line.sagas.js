import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import HistoryLineActions from './history-line.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getHistoryLine(api, action) {
  const { historyLineId } = action;
  // make the call to the api
  const apiCall = call(api.getHistoryLine, historyLineId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(HistoryLineActions.historyLineSuccess(response.data));
  } else {
    yield put(HistoryLineActions.historyLineFailure(response.data));
  }
}

function* getAllHistoryLines(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllHistoryLines, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HistoryLineActions.historyLineAllSuccess(response.data, response.headers));
  } else {
    yield put(HistoryLineActions.historyLineAllFailure(response.data));
  }
}

function* updateHistoryLine(api, action) {
  const { historyLine } = action;
  // make the call to the api
  const idIsNotNull = !(historyLine.id === null || historyLine.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateHistoryLine : api.createHistoryLine, historyLine);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(HistoryLineActions.historyLineUpdateSuccess(response.data));
  } else {
    yield put(HistoryLineActions.historyLineUpdateFailure(response.data));
  }
}

function* deleteHistoryLine(api, action) {
  const { historyLineId } = action;
  // make the call to the api
  const apiCall = call(api.deleteHistoryLine, historyLineId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HistoryLineActions.historyLineDeleteSuccess());
  } else {
    yield put(HistoryLineActions.historyLineDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.timestamp = convertDateTimeFromServer(data.timestamp);
  return data;
}

export default {
  getAllHistoryLines,
  getHistoryLine,
  deleteHistoryLine,
  updateHistoryLine,
};
