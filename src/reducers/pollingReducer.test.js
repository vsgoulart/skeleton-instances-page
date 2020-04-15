import '@testing-library/jest-dom/extend-expect';
import pollingReducer from './pollingReducer';

test('TRIGGER_POLLING', async () => {
  let state = {};
  state = pollingReducer({}, {type: 'TRIGGER_POLLING', payload: {type: 'WORKFLOW_INSTANCES', isPolling: true}});

  expect(state).toEqual({WORKFLOW_INSTANCES: true});

  state = pollingReducer(state, {type: 'TRIGGER_POLLING', payload: {type: 'STATISTICS', isPolling: true}});
  expect(state).toEqual({WORKFLOW_INSTANCES: true, STATISTICS: true});

  state = pollingReducer(state, {type: 'TRIGGER_POLLING', payload: {type: 'BATCH_OPERATIONS', isPolling: true}});
  expect(state).toEqual({WORKFLOW_INSTANCES: true, STATISTICS: true, BATCH_OPERATIONS: true});

  state = pollingReducer(state, {type: 'TRIGGER_POLLING', payload: {type: 'WORKFLOW_INSTANCES', isPolling: false}});

  expect(state).toEqual({WORKFLOW_INSTANCES: false, STATISTICS: true, BATCH_OPERATIONS: true});
});
