import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/recl-rep/recl-rep.reducer';

test('attempt retrieving a single reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.reclRep).toEqual({ id: undefined });
});

test('attempt retrieving a list of reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.reclRepList).toEqual([]);
});

test('attempt updating a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.reclRep).toEqual({ id: 1 });
});

test('success retrieving a list of reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.reclRepList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.reclRep).toEqual({ id: 1 });
});
test('success deleting a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.reclRep).toEqual({ id: undefined });
});

test('failure retrieving a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.reclRep).toEqual({ id: undefined });
});

test('failure retrieving a list of reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.reclRepList).toEqual([]);
});

test('failure updating a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.reclRep).toEqual(INITIAL_STATE.reclRep);
});
test('failure deleting a reclRep', () => {
  const state = reducer(INITIAL_STATE, Actions.reclRepDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.reclRep).toEqual(INITIAL_STATE.reclRep);
});

test('resetting state for reclRep', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.reclRepReset());
  expect(state).toEqual(INITIAL_STATE);
});
