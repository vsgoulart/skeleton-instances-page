// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import {getWorkflowInstances} from './instances';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};
test('getWorkflowInstances', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123, "workflowInstances": []}')));

  await getWorkflowInstances()(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(2, {
    type: 'GET_WORKFLOW_INSTANCES',
    payload: {test: 123, workflowInstances: []},
  });
});
