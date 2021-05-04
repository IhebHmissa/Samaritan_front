import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/history-line/history-line.reducer';

test('attempt retrieving a single historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.historyLine).toEqual({ id: undefined });
});

test('attempt retrieving a list of historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.historyLineList).toEqual([]);
});

test('attempt updating a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.historyLine).toEqual({ id: 1 });
});

test('success retrieving a list of historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.historyLineList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.historyLine).toEqual({ id: 1 });
});
test('success deleting a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.historyLine).toEqual({ id: undefined });
});

test('failure retrieving a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.historyLine).toEqual({ id: undefined });
});

test('failure retrieving a list of historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.historyLineList).toEqual([]);
});

test('failure updating a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.historyLine).toEqual(INITIAL_STATE.historyLine);
});
test('failure deleting a historyLine', () => {
  const state = reducer(INITIAL_STATE, Actions.historyLineDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.historyLine).toEqual(INITIAL_STATE.historyLine);
});

test('resetting state for historyLine', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.historyLineReset());
  expect(state).toEqual(INITIAL_STATE);
});
