// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import pollingReducer from './pollingReducer';

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock('axios');

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
