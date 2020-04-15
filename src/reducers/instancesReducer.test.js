import '@testing-library/jest-dom/extend-expect';
import instancesReducer from './instancesReducer';

test('GET_WORKFLOW_INSTANCES_FINISHED: should return state correctly', async () => {
  var workflowInstances = [
    {hasActiveOperation: true, id: 1},
    {hasActiveOperation: false, id: 2},
    {hasActiveOperation: false, id: 3},
    {hasActiveOperation: true, id: 4},
    {hasActiveOperation: false, id: 5},
  ];
  var state = instancesReducer(
    {},
    {
      type: 'GET_WORKFLOW_INSTANCES_FINISHED',
      payload: {
        totalCount: workflowInstances.length,
        workflowInstances: workflowInstances,
      },
    },
  );

  expect(state).toEqual({
    active: [1, 4],
    instances: workflowInstances,
    totalCount: 5,
    isLoading: false,
  });
});

test('GET_WORKFLOW_INSTANCES_FINISHED: should update state correctly', async () => {
  var currentWorkflowInstances = [
    {hasActiveOperation: true, id: 1},
    {hasActiveOperation: false, id: 2},
    {hasActiveOperation: false, id: 3},
    {hasActiveOperation: true, id: 4},
    {hasActiveOperation: false, id: 5},
  ];
  var updatedWorkflowInstances = [
    {hasActiveOperation: false, id: 1},
    {hasActiveOperation: false, id: 2},
    {hasActiveOperation: false, id: 3},
    {hasActiveOperation: false, id: 4},
  ];
  var state = instancesReducer(
    {instances: currentWorkflowInstances, totalCount: 5},
    {
      type: 'GET_WORKFLOW_INSTANCES_FINISHED',
      payload: {
        totalCount: updatedWorkflowInstances.length,
        workflowInstances: updatedWorkflowInstances,
      },
    },
  );

  expect(state).toEqual({
    active: [],
    instances: updatedWorkflowInstances,
    totalCount: 4,
    isLoading: false,
  });
});
