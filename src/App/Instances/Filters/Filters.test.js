import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText, fireEvent} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import {Filters} from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    search: '?active=true',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test('display workflows', async () => {
  var mockGetGroupedWorkflows = jest.fn();
  var mockGetWorkflowInstances = jest.fn();

  render(
    <Filters
      totalInstanceCount={100}
      getWorkflowInstances={mockGetWorkflowInstances}
      getGroupedWorkflows={mockGetGroupedWorkflows}
      workflows={[
        {bpmnProcessId: 1, name: 'workflow1'},
        {bpmnProcessId: 2, name: 'workflow2'},
      ]}
    />,
  );

  var workflows = screen.queryByTestId('workflows');

  expect(queryByText(workflows, 'workflow1')).toBeInTheDocument();
  expect(queryByText(workflows, 'workflow2')).toBeInTheDocument();
});

test('fetch grouped workflows on load', async () => {
  var mockGetGroupedWorkflows = jest.fn();
  var mockGetWorkflowInstances = jest.fn();

  render(
    <Filters
      totalInstanceCount={100}
      getWorkflowInstances={mockGetWorkflowInstances}
      getGroupedWorkflows={mockGetGroupedWorkflows}
      workflows={[
        {bpmnProcessId: 1, name: 'workflow1'},
        {bpmnProcessId: 2, name: 'workflow2'},
      ]}
    />,
  );
  expect(mockGetGroupedWorkflows).toHaveBeenCalledTimes(1);
});

test('fetch workflow instances on error message change', async () => {
  var mockGetGroupedWorkflows = jest.fn();
  var mockGetWorkflowInstances = jest.fn();

  render(
    <Filters
      totalInstanceCount={100}
      getWorkflowInstances={mockGetWorkflowInstances}
      getGroupedWorkflows={mockGetGroupedWorkflows}
      workflows={[
        {bpmnProcessId: 1, name: 'workflow1'},
        {bpmnProcessId: 2, name: 'workflow2'},
      ]}
    />,
  );

  expect(mockGetWorkflowInstances).toHaveBeenCalledTimes(0);
  fireEvent.change(screen.queryByTestId('errorMessage'), {target: {value: 'a'}});
  expect(mockGetWorkflowInstances).toHaveBeenCalledTimes(1);
});
