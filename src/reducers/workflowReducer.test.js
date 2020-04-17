import '@testing-library/jest-dom/extend-expect';
import workflowReducer from './workflowReducer';

test('GET_GROUPED_WORKFLOWS', async () => {
  var response = {test: 123};
  var state = workflowReducer({}, {type: 'GET_GROUPED_WORKFLOWS', payload: response});

  expect(state).toEqual(response);
});
