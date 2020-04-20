import '@testing-library/jest-dom/extend-expect';
import {getGroupedWorkflows} from './index';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};
test('getGroupedWorkflows', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await getGroupedWorkflows()(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'GET_GROUPED_WORKFLOWS',
    payload: {test: 123},
  });
});
