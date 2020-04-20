import '@testing-library/jest-dom/extend-expect';
import {setInstancesAsActive, getWorkflowInstances, pollInstances} from './instances';
// import {getStatistics} from './statistics';

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

test('setInstancesAsActive', async () => {
  var activeInstanceIdList = [1, 2];
  var mockDispatch = jest.fn();

  await setInstancesAsActive(activeInstanceIdList)(mockDispatch);

  expect(mockDispatch).toHaveBeenNthCalledWith(1, {
    type: 'SET_INSTANCES_AS_ACTIVE',
    payload: activeInstanceIdList,
  });
});

test('getWorkflowInstances: no active operations', async () => {
  var mockDispatch = jest.fn();

  var workflowInstances = [
    {id: 1, hasActiveOperation: false},
    {id: 2, hasActiveOperation: false},
  ];
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockResponse(200, `{"workflowInstances": ${JSON.stringify(workflowInstances)}}`)),
    );

  await getWorkflowInstances()(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  // expect(mockDispatch).toHaveBeenNthCalledWith(2, getStatistics());
  expect(mockDispatch).toHaveBeenNthCalledWith(2, {
    type: 'GET_WORKFLOW_INSTANCES',
    payload: {workflowInstances: workflowInstances},
  });
});

test('getWorkflowInstances: active operations', async () => {
  var mockDispatch = jest.fn();
  var workflowInstances = [
    {id: 1, hasActiveOperation: false},
    {id: 2, hasActiveOperation: true},
  ];

  window.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve(mockResponse(200, `{"workflowInstances": ${JSON.stringify(workflowInstances)}}`)),
    )
    .mockImplementationOnce(() => Promise.resolve(mockResponse(200, `{"running": 20, "active": 30, "instances": 40}`)));

  await getWorkflowInstances()(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, pollInstances);
  // expect(mockDispatch).toHaveBeenNthCalledWith(2, getStatistics());
  expect(mockDispatch).toHaveBeenNthCalledWith(3, {
    type: 'GET_WORKFLOW_INSTANCES',
    payload: {workflowInstances: workflowInstances},
  });
});

test('pollInstances', async () => {
  jest.useFakeTimers();

  var mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, '{}')));

  pollInstances(mockDispatch);
  pollInstances(mockDispatch);
  pollInstances(mockDispatch);
  pollInstances(mockDispatch);
  pollInstances(mockDispatch);
  jest.advanceTimersByTime(5000);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
