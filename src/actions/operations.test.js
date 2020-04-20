import '@testing-library/jest-dom/extend-expect';
import {getOperations, createOperation, createBatchOperation, pollOperations, pollInstances} from './index';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};
test('createOperation', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await createOperation({id: 1})(mockDispatch);

  expect(mockDispatch).toHaveBeenCalledTimes(3);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'CREATE_OPERATION',
    payload: {test: 123},
  });
  expect(mockDispatch).toHaveBeenNthCalledWith(2, pollOperations);
  expect(mockDispatch).toHaveBeenNthCalledWith(3, pollInstances);
});

test('createBatchOperation', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await createBatchOperation({ids: [1], type: 'type'})(mockDispatch);

  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'CREATE_BATCH_OPREATION',
    payload: {test: 123},
  });
  expect(mockDispatch).toHaveBeenNthCalledWith(2, pollOperations);
  expect(mockDispatch).toHaveBeenNthCalledWith(3, pollInstances);
});

test('getOperations: do not poll', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse(200, '[{"id":1, "endDate":"2020-12-12"}]')));

  await getOperations()(mockDispatch);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'GET_OPERATIONS',
    payload: [{id: 1, endDate: '2020-12-12'}],
  });
});

test('getOperations: poll', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '[{"id":1, "endDate":null}]')));

  await getOperations()(mockDispatch);

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, pollOperations);
  expect(mockDispatch).toHaveBeenNthCalledWith(2, {
    type: 'GET_OPERATIONS',
    payload: [{id: 1, endDate: null}],
  });
});

test('pollOperations', async () => {
  jest.useFakeTimers();

  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{}')));

  pollOperations(mockDispatch);
  pollOperations(mockDispatch);
  pollOperations(mockDispatch);
  pollOperations(mockDispatch);
  pollOperations(mockDispatch);
  jest.advanceTimersByTime(5000);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
