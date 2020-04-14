// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import operationsReducer from './operationsReducer';

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock('axios');

test('CANCEL_OPERATION: state should not be changed', async () => {
  var currentState = {operations: [{id: 1}, {id: 2}]};
  var state = operationsReducer(currentState, {type: 'CANCEL_OPERATION'});

  expect(state).toEqual(currentState);
});

test('RETRY_OPERATION', async () => {
  var currentState = {operations: [{id: 1}, {id: 2}]};
  var state = operationsReducer(currentState, {type: 'RETRY_OPERATION'});
  expect(state).toEqual(currentState);
});

test('CREATE_BATCH_OPREATION', async () => {
  var currentState = {operations: [{id: 1}, {id: 2}]};
  var state = operationsReducer(currentState, {type: 'CREATE_BATCH_OPREATION'});

  expect(state).toEqual(currentState);
});

test('GET_OPERATIONS: should return state correctly', async () => {
  var currentState = {operations: [{id: 1}, {id: 2}]};

  var state = operationsReducer(currentState, {
    type: 'GET_OPERATIONS',
    payload: [{id: 1}, {id: 2}, {id: 3}],
  });

  expect(state).toEqual({
    operations: [{id: 1}, {id: 2}, {id: 3}],
  });
});
