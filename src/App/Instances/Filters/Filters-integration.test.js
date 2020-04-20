import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText, waitFor} from '@testing-library/dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import '@testing-library/jest-dom/extend-expect';
import Filters from './index';
import reducers from '../../../reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(reduxThunk));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    search: '?active=true',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

test('display workflows', async () => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        mockResponse(200, '[{"bpmnProcessId": 1, "name": "workflow1"}, {"bpmnProcessId": 2, "name": "workflow2"}]'),
      ),
    );

  render(
    <Provider store={store}>
      <Filters />
    </Provider>,
  );

  var workflows = screen.queryByTestId('workflows');

  await waitFor(
    () => {
      expect(queryByText(workflows, 'workflow1')).toBeInTheDocument();
      expect(queryByText(workflows, 'workflow2')).toBeInTheDocument();
    },
    {timeout: 3000},
  );

  // update values if grouped workflows change
  store.dispatch({
    type: 'GET_GROUPED_WORKFLOWS',
    payload: [
      {bpmnProcessId: 3, name: 'workflow3'},
      {bpmnProcessId: 4, name: 'workflow4'},
    ],
  });

  await waitFor(
    () => {
      expect(queryByText(workflows, 'workflow1')).not.toBeInTheDocument();
      expect(queryByText(workflows, 'workflow2')).not.toBeInTheDocument();
      expect(queryByText(workflows, 'workflow3')).toBeInTheDocument();
      expect(queryByText(workflows, 'workflow4')).toBeInTheDocument();
    },
    {timeout: 3000},
  );
});

test('display filter count', async () => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        mockResponse(200, '[{"bpmnProcessId": 1, "name": "workflow1"}, {"bpmnProcessId": 2, "name": "workflow2"}]'),
      ),
    );

  render(
    <Provider store={store}>
      <Filters />
    </Provider>,
  );

  var filtersCount = screen.queryByTestId('filtersCount');

  await waitFor(
    () => {
      expect(queryByText(filtersCount, '0')).toBeInTheDocument();
    },
    {timeout: 3000},
  );

  // update filter value correctly
  store.dispatch({
    type: 'GET_WORKFLOW_INSTANCES',
    payload: {workflowInstances: [], totalCount: 100},
  });

  await waitFor(
    () => {
      expect(queryByText(filtersCount, '100')).toBeInTheDocument();
    },
    {timeout: 3000},
  );
});
