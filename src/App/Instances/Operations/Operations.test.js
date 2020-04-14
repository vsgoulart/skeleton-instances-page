// import dependencies
import React from 'react';

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
// the component to test
import {Operations} from './index';

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock('axios');

test('has correct title', async () => {
  var mockGetBatchOperations = jest.fn();
  const {container, asFragment} = render(<Operations getBatchOperations={mockGetBatchOperations} />);
  expect(mockGetBatchOperations).toHaveBeenCalledTimes(1);
  const h2 = container.querySelector('h2');
  expect(h2).not.toBe(null);
  expect(h2.textContent).toBe('Operations');

  expect(asFragment()).toMatchSnapshot();
});

test('lists operations', async () => {
  var mockGetBatchOperations = jest.fn();
  const {container, asFragment} = render(
    <Operations
      getBatchOperations={mockGetBatchOperations}
      operations={[
        {id: 1, startDate: '2020-01-01', endDate: '2020-01-02', operationsFinishedCount: 10, operationsTotalCount: 10},
        {id: 2, startDate: '2020-02-01', endDate: '2020-02-02', operationsFinishedCount: 20, operationsTotalCount: 20},
      ]}
    />,
  );
  expect(mockGetBatchOperations).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchSnapshot();

  expect(screen.queryByTestId('operation-1')).not.toBe(null);
  expect(screen.queryByTestId('operation-2')).not.toBe(null);
});
