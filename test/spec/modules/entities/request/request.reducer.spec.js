import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/request/request.reducer';

test('attempt retrieving a single request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.request).toEqual({ id: undefined });
});

test('attempt retrieving a list of request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.requestList).toEqual([]);
});

test('attempt updating a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.request).toEqual({ id: 1 });
});

test('success retrieving a list of request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.requestList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.request).toEqual({ id: 1 });
});
test('success deleting a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.request).toEqual({ id: undefined });
});

test('failure retrieving a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.request).toEqual({ id: undefined });
});

test('failure retrieving a list of request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.requestList).toEqual([]);
});

test('failure updating a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.request).toEqual(INITIAL_STATE.request);
});
test('failure deleting a request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.request).toEqual(INITIAL_STATE.request);
});

test('resetting state for request', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.requestReset());
  expect(state).toEqual(INITIAL_STATE);
});
