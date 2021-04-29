import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ReclRepSagas from '../../../../../app/modules/entities/recl-rep/recl-rep.sagas';
import ReclRepActions from '../../../../../app/modules/entities/recl-rep/recl-rep.reducer';

const { getReclRep, getAllReclReps, updateReclRep, deleteReclRep } = ReclRepSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getReclRep(1);
  const step = stepper(getReclRep(FixtureAPI, { reclRepId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReclRepActions.reclRepSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getReclRep(FixtureAPI, { reclRepId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReclRepActions.reclRepFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllReclReps();
  const step = stepper(getAllReclReps(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReclRepActions.reclRepAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllReclReps(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReclRepActions.reclRepAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateReclRep({ id: 1 });
  const step = stepper(updateReclRep(FixtureAPI, { reclRep: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReclRepActions.reclRepUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateReclRep(FixtureAPI, { reclRep: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReclRepActions.reclRepUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteReclRep({ id: 1 });
  const step = stepper(deleteReclRep(FixtureAPI, { reclRepId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReclRepActions.reclRepDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteReclRep(FixtureAPI, { reclRepId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReclRepActions.reclRepDeleteFailure()));
});
