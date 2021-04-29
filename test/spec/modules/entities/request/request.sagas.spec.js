import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import RequestSagas from '../../../../../app/modules/entities/request/request.sagas';
import RequestActions from '../../../../../app/modules/entities/request/request.reducer';

const { getRequest, getAllRequests, updateRequest, deleteRequest } = RequestSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getRequest(1);
  const step = stepper(getRequest(FixtureAPI, { requestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RequestActions.requestSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getRequest(FixtureAPI, { requestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RequestActions.requestFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllRequests();
  const step = stepper(getAllRequests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RequestActions.requestAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllRequests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RequestActions.requestAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateRequest({ id: 1 });
  const step = stepper(updateRequest(FixtureAPI, { request: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RequestActions.requestUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateRequest(FixtureAPI, { request: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RequestActions.requestUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteRequest({ id: 1 });
  const step = stepper(deleteRequest(FixtureAPI, { requestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RequestActions.requestDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteRequest(FixtureAPI, { requestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RequestActions.requestDeleteFailure()));
});
