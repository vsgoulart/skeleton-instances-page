import '@testing-library/jest-dom/extend-expect';
import operationsReducer from './operationsReducer';
jest.mock('axios');

test('CREATE_OPERATION: new operation should be added on top of list', async () => {
  var currentState = [{id: 1}, {id: 2}];
  var state = operationsReducer(currentState, {type: 'CREATE_OPERATION', payload: {id: 3}});

  expect(state).toEqual([{id: 3}, {id: 1}, {id: 2}]);
});

test('CREATE_BATCH_OPREATION: new operation should be added on top of list', async () => {
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
