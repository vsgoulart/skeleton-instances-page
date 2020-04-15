import '@testing-library/jest-dom/extend-expect';
import {getBatchOperations, cancelOperation, retryOperation, createBatchOperation} from './index';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

test('getBatchOperations', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await getBatchOperations()(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'GET_OPERATIONS_LOADING',
  });
  expect(mockDispatch).toHaveBeenNthCalledWith(2, {
    type: 'GET_OPERATIONS_FINISHED',
    payload: {test: 123},
  });
});
test('cancelOperation', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await cancelOperation({id: 1})(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'CANCEL_OPERATION',
    payload: {test: 123},
  });
});
test('retryOperation', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await retryOperation({id: 1})(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'RETRY_OPERATION',
    payload: {test: 123},
  });
});
test('createBatchOperation', async () => {
  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{"test":123}')));

  await createBatchOperation({ids: [1], type: 'type'})(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'CREATE_BATCH_OPREATION',
    payload: {test: 123},
  });
});
