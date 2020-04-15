// import dependencies
import React from 'react';

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import instancesReducer from './instancesReducer';

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock('axios');

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
