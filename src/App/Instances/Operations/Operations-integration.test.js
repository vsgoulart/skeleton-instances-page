import React from 'react';
import {render, screen} from '@testing-library/react';
import {queryByText, waitFor, queryAllBy} from '@testing-library/dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import '@testing-library/jest-dom/extend-expect';
import Operations from './index';
import reducers from '../../../reducers';
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
    .mockImplementation(() =>
      Promise.resolve(
        mockResponse(
          200,
          '[{"id":1,"startDate":"2020-01-01", "endDate": null, "operationsFinishedCount":10, "operationsTotalCount":20},{"id":2,"startDate":"2020-02-02", "endDate": null, "operationsFinishedCount":4, "operationsTotalCount":5}]',
        ),
      ),
    );

  var {container} = render(
    <Provider store={store}>
      <Operations />
    </Provider>,
  );

  await waitFor(
    () => {
      expect(container).toHaveTextContent('1');
      expect(container).toHaveTextContent('2020-01-01');
      expect(container).toHaveTextContent('-');
      expect(container).toHaveTextContent('10 / 20');
      expect(container).toHaveTextContent('2');
      expect(container).toHaveTextContent('2020-02-02');
      expect(container).toHaveTextContent('-');
      expect(container).toHaveTextContent('4 / 5');
    },
    {timeout: 3000},
  );
});
