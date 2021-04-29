import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import HistoryLineSagas from '../../../../../app/modules/entities/history-line/history-line.sagas';
import HistoryLineActions from '../../../../../app/modules/entities/history-line/history-line.reducer';

const { getHistoryLine, getAllHistoryLines, updateHistoryLine, deleteHistoryLine } = HistoryLineSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getHistoryLine(1);
  const step = stepper(getHistoryLine(FixtureAPI, { historyLineId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getHistoryLine(FixtureAPI, { historyLineId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllHistoryLines();
  const step = stepper(getAllHistoryLines(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllHistoryLines(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateHistoryLine({ id: 1 });
  const step = stepper(updateHistoryLine(FixtureAPI, { historyLine: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateHistoryLine(FixtureAPI, { historyLine: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteHistoryLine({ id: 1 });
  const step = stepper(deleteHistoryLine(FixtureAPI, { historyLineId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteHistoryLine(FixtureAPI, { historyLineId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HistoryLineActions.historyLineDeleteFailure()));
});
