import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText, fireEvent} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import {Table} from './index';

test('lists workflow instances', async () => {
  var mockCreateOperation = jest.fn();
  var mockCreateBatchOperation = jest.fn();
  var mockGetWorkflowInstances = jest.fn();
  var mockSetInstancesAsActive = jest.fn();
  render(
    <Table
      createOperation={mockCreateOperation}
      createBatchOperation={mockCreateBatchOperation}
      getWorkflowInstances={mockGetWorkflowInstances}
      setInstancesAsActive={mockSetInstancesAsActive}
      workflowInstances={[
        {id: 1, state: 'ACTIVE', hasActiveOperation: false, startDate: '2020-01-01', endDate: '2020-02-02'},
        {id: 2, state: 'RUNNING', hasActiveOperation: true, startDate: '2020-02-02', endDate: null},
        {id: 3, state: 'INCIDENT', hasActiveOperation: false, startDate: '2020-03-03', endDate: null},
      ]}
      totalInstanceCount={2}
    />,
  );

  expect(mockGetWorkflowInstances).toHaveBeenCalledTimes(1);

  var workflow1 = screen.queryByTestId('workflow-1');

  expect(queryByText(workflow1, 'ACTIVE')).toBeInTheDocument();
  expect(queryByText(workflow1, '1')).toBeInTheDocument();
  expect(queryByText(workflow1, 'Loading...')).not.toBeInTheDocument();
  expect(queryByText(workflow1, '2020-01-01')).toBeInTheDocument();
  expect(queryByText(workflow1, 'Retry')).not.toBeInTheDocument();
  expect(queryByText(workflow1, 'Cancel')).toBeInTheDocument();

  var workflow2 = screen.queryByTestId('workflow-2');

  expect(queryByText(workflow2, 'RUNNING')).toBeInTheDocument();
  expect(queryByText(workflow2, '2')).toBeInTheDocument();
  expect(queryByText(workflow2, 'Loading...')).toBeInTheDocument();
  expect(queryByText(workflow2, '2020-02-02')).toBeInTheDocument();
  expect(queryByText(workflow2, 'Retry')).not.toBeInTheDocument();
  expect(queryByText(workflow2, 'Cancel')).toBeInTheDocument();

  var workflow3 = screen.queryByTestId('workflow-3');

  expect(queryByText(workflow3, 'INCIDENT')).toBeInTheDocument();
  expect(queryByText(workflow3, '3')).toBeInTheDocument();
  expect(queryByText(workflow3, 'Loading...')).not.toBeInTheDocument();
  expect(queryByText(workflow3, '2020-03-03')).toBeInTheDocument();
  expect(queryByText(workflow3, 'Retry')).toBeInTheDocument();
  expect(queryByText(workflow3, 'Cancel')).toBeInTheDocument();
});

test('create batch operation - retry', async () => {
  var mockCreateOperation = jest.fn();
  var mockCreateBatchOperation = jest.fn();
  var mockGetWorkflowInstances = jest.fn();
  var mockSetInstancesAsActive = jest.fn();
  render(
    <Table
      createOperation={mockCreateOperation}
      createBatchOperation={mockCreateBatchOperation}
      getWorkflowInstances={mockGetWorkflowInstances}
      setInstancesAsActive={mockSetInstancesAsActive}
      workflowInstances={[
        {id: 1, state: 'ACTIVE', hasActiveOperation: false, startDate: '2020-01-01', endDate: '2020-02-02'},
        {id: 2, state: 'RUNNING', hasActiveOperation: true, startDate: '2020-02-02', endDate: null},
        {id: 3, state: 'INCIDENT', hasActiveOperation: false, startDate: '2020-03-03', endDate: null},
      ]}
      totalInstanceCount={2}
    />,
  );

  fireEvent.click(screen.queryByTestId('checkAll'));
  fireEvent.click(screen.queryByTestId('batch-operation-retry'));

  expect(mockSetInstancesAsActive).toHaveBeenNthCalledWith(1, [1, 2, 3]);
  expect(mockCreateBatchOperation).toHaveBeenNthCalledWith(1, {ids: [1, 2, 3], type: 'RETRY_WORKFLOW_INSTANCE'});
});

test('create batch operation - cancel', async () => {
  var mockCreateOperation = jest.fn();
  var mockCreateBatchOperation = jest.fn();
  var mockGetWorkflowInstances = jest.fn();
  var mockSetInstancesAsActive = jest.fn();
  render(
    <Table
      createOperation={mockCreateOperation}
      createBatchOperation={mockCreateBatchOperation}
      getWorkflowInstances={mockGetWorkflowInstances}
      setInstancesAsActive={mockSetInstancesAsActive}
      workflowInstances={[
        {id: 1, state: 'ACTIVE', hasActiveOperation: false, startDate: '2020-01-01', endDate: '2020-02-02'},
        {id: 2, state: 'RUNNING', hasActiveOperation: true, startDate: '2020-02-02', endDate: null},
        {id: 3, state: 'INCIDENT', hasActiveOperation: false, startDate: '2020-03-03', endDate: null},
      ]}
      totalInstanceCount={2}
    />,
  );

  fireEvent.click(screen.queryByTestId('checkAll'));
  fireEvent.click(screen.queryByTestId('batch-operation-cancel'));

  expect(mockSetInstancesAsActive).toHaveBeenNthCalledWith(1, [1, 2, 3]);
  expect(mockCreateBatchOperation).toHaveBeenNthCalledWith(1, {ids: [1, 2, 3], type: 'CANCEL_WORKFLOW_INSTANCE'});
});

test('retry operation', async () => {
  var mockCreateOperation = jest.fn();
  var mockCreateBatchOperation = jest.fn();
  var mockGetWorkflowInstances = jest.fn();
  var mockSetInstancesAsActive = jest.fn();
  render(
    <Table
      createOperation={mockCreateOperation}
      createBatchOperation={mockCreateBatchOperation}
      getWorkflowInstances={mockGetWorkflowInstances}
      setInstancesAsActive={mockSetInstancesAsActive}
      workflowInstances={[
        {id: 1, state: 'INCIDENT', hasActiveOperation: false, startDate: '2020-03-03', endDate: null},
      ]}
      totalInstanceCount={2}
    />,
  );

  fireEvent.click(screen.queryByTestId('check'));
  fireEvent.click(screen.queryByTestId('retry-operation'));

  expect(mockSetInstancesAsActive).toHaveBeenNthCalledWith(1, [1]);
  expect(mockCreateOperation).toHaveBeenNthCalledWith(1, {id: 1, type: 'RETRY_WORKFLOW_INSTANCE'});
});

test('cancel operation', async () => {
  var mockCreateOperation = jest.fn();
  var mockCreateBatchOperation = jest.fn();
  var mockGetWorkflowInstances = jest.fn();
  var mockSetInstancesAsActive = jest.fn();
  render(
    <Table
      createOperation={mockCreateOperation}
      createBatchOperation={mockCreateBatchOperation}
      getWorkflowInstances={mockGetWorkflowInstances}
      setInstancesAsActive={mockSetInstancesAsActive}
      workflowInstances={[
        {id: 1, state: 'INCIDENT', hasActiveOperation: false, startDate: '2020-03-03', endDate: null},
      ]}
      totalInstanceCount={2}
    />,
  );

  fireEvent.click(screen.queryByTestId('check'));
  fireEvent.click(screen.queryByTestId('cancel-operation'));

  expect(mockSetInstancesAsActive).toHaveBeenNthCalledWith(1, [1]);
  expect(mockCreateOperation).toHaveBeenNthCalledWith(1, {id: 1, type: 'CANCEL_WORKFLOW_INSTANCE'});
});
