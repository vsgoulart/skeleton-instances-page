import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import {Header} from './index';
import {BrowserRouter} from 'react-router-dom';

test('has correct counts when totalInstanceCount does not exist', async () => {
  var mockGetStatistics = jest.fn();

  render(
    <BrowserRouter>
      <Header statistics={{running: 50, withIncidents: 20}} getStatistics={mockGetStatistics} />
    </BrowserRouter>,
  );

  expect(mockGetStatistics).toHaveBeenCalledTimes(1);

  var runningInstanceCount = screen.queryByTestId('running');
  var withIncidentsCount = screen.queryByTestId('withIncidents');
  var filtersCount = screen.queryByTestId('filters');

  expect(queryByText(runningInstanceCount, '50')).toBeInTheDocument();
  expect(queryByText(withIncidentsCount, '20')).toBeInTheDocument();
  expect(queryByText(filtersCount, '50')).toBeInTheDocument();
});

test('has correct counts when totalInstanceCount exists', async () => {
  var mockGetStatistics = jest.fn();

  render(
    <BrowserRouter>
      <Header statistics={{running: 50, withIncidents: 20}} totalInstanceCount={25} getStatistics={mockGetStatistics} />
    </BrowserRouter>,
  );
  expect(mockGetStatistics).toHaveBeenCalledTimes(1);

  var runningInstanceCount = screen.queryByTestId('running');
  var withIncidentsCount = screen.queryByTestId('withIncidents');
  var filtersCount = screen.queryByTestId('filters');

  expect(queryByText(runningInstanceCount, '50')).toBeInTheDocument();
  expect(queryByText(withIncidentsCount, '20')).toBeInTheDocument();
  expect(queryByText(filtersCount, '25')).toBeInTheDocument();
});
