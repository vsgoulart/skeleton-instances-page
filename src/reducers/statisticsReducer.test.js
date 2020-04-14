// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import statisticsReducer from './statisticsReducer';

// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock('axios');

test('GET_STATISTICS', async () => {
  var statistics = {running: 877, active: 103, withIncidents: 774};
  var state = statisticsReducer({}, {type: 'GET_STATISTICS', payload: statistics});

  expect(state).toEqual(statistics);
});
