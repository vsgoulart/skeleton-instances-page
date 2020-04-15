import '@testing-library/jest-dom/extend-expect';
import statisticsReducer from './statisticsReducer';

test('GET_STATISTICS', async () => {
  var statistics = {running: 877, active: 103, withIncidents: 774};
  var state = statisticsReducer({}, {type: 'GET_STATISTICS', payload: statistics});

  expect(state).toEqual({statistics: statistics});
});
