import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {Table} from './';

import {createOperation, fetchWorkflowInstances} from '../../api';

jest.useFakeTimers();
jest.mock('../../api', () => ({
  fetchWorkflowInstances: jest
    .fn()
    .mockReturnValueOnce({workflowInstances: [{id: '123456654321', hasActiveOperation: true}]})
    .mockReturnValueOnce({workflowInstances: [{id: '123456654321', hasActiveOperation: false}]}),
  fetchStatistics: jest.fn().mockReturnValue({}),
  createOperation: jest.fn().mockReturnValue({}),
}));

// this is an integration test, where the mobx stores are also tested, only the API endpoints are mocked
test('should render instance', async () => {
  const {findAllByText, debug} = render(<Table />);

  expect(await findAllByText('123456654321')).toHaveLength(1);
  debug();
});

test('should create operation and start polling', async () => {
  const {findAllByTestId} = render(<Table />);
  const buttons = await findAllByTestId('cancel-button');

  fireEvent.click(buttons[0]);

  jest.runAllTimers();

  expect(createOperation).toHaveBeenCalledTimes(1);

  // fetchWorkflowInstances is called twice:
  // * on init, returns hasActiveOperateion: true
  // * on the first poll, returns hasActiveOperation: false
  expect(fetchWorkflowInstances).toHaveBeenCalledTimes(2);
});
