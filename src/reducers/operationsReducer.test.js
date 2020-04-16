import '@testing-library/jest-dom/extend-expect';
import operationsReducer from './operationsReducer';
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
  var currentState = [{id: 1}, {id: 2}];
  var state = operationsReducer(currentState, {type: 'CREATE_BATCH_OPREATION', payload: {id: 4}});

  expect(state).toEqual([{id: 4}, {id: 1}, {id: 2}]);
});

test('GET_OPERATIONS: should return state correctly', async () => {
  var currentState = {operations: [{id: 1}, {id: 2}]};

  var state = operationsReducer(currentState, {
    type: 'GET_OPERATIONS',
    payload: [
      {id: 1, endDate: '2020-12-12'},
      {id: 2, endDate: '2020-12-12'},
      {id: 3, endDate: null},
    ],
  });

  expect(state).toEqual([
    {id: 1, endDate: '2020-12-12'},
    {id: 2, endDate: '2020-12-12'},
    {id: 3, endDate: null},
  ]);
});
