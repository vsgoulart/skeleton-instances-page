import '@testing-library/jest-dom/extend-expect';
import {getStatistics} from './index';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};
test('getStatistics', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await getStatistics()(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'GET_STATISTICS',
    payload: {test: 123},
  });
});
