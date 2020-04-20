import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText, waitFor} from '@testing-library/dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import '@testing-library/jest-dom/extend-expect';
import Header from './index';
import {BrowserRouter} from 'react-router-dom';
import reducers from '../../reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(reduxThunk));
const mockResponse = (status, response) => {
  return new window.Response(response, {
    status: status,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

test('see correct counts', async () => {
  window.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse(200, '{"running":100, "withIncidents":20, "filters": 2}')));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>,
  );

  var runningInstanceCount = screen.queryByTestId('running');
  var withIncidentsCount = screen.queryByTestId('withIncidents');
  var filtersCount = screen.queryByTestId('filters');

  await waitFor(
    () => {
      expect(queryByText(runningInstanceCount, '100')).toBeInTheDocument();
      expect(queryByText(withIncidentsCount, '20')).toBeInTheDocument();
      expect(queryByText(filtersCount, '100')).toBeInTheDocument();
    },
    {timeout: 3000},
  );
});
