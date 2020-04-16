import '@testing-library/jest-dom/extend-expect';
import instancesReducer from './instancesReducer';

test('GET_WORKFLOW_INSTANCES: should return state correctly', async () => {
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
      type: 'GET_WORKFLOW_INSTANCES',
      payload: {
        totalCount: workflowInstances.length,
        workflowInstances: workflowInstances,
      },
    },
  );

  expect(state).toEqual({
    instances: workflowInstances,
    totalCount: 5,
  });
});

test('GET_WORKFLOW_INSTANCES: should update state correctly', async () => {
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
      type: 'GET_WORKFLOW_INSTANCES',
      payload: {
        totalCount: updatedWorkflowInstances.length,
        workflowInstances: updatedWorkflowInstances,
      },
    },
  );

  expect(state).toEqual({
    instances: updatedWorkflowInstances,
    totalCount: 4,
  });
});
