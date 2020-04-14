import {createEffect, forward} from 'effector';
import throttle from 'lodash.throttle';
import {ENDPOINTS} from '../endpoints';
import {statistics$} from './stores';
import {pollOperations} from '../operations';

const throttledFetchStatisticsHandler = throttle(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(fetch(ENDPOINTS.statistics).then(response => response.json()));
      }, 1000);
    }),
  5000,
);

const fetchStatistics = createEffect({
  handler: throttledFetchStatisticsHandler,
});

statistics$.on(fetchStatistics.doneData, (_, response) => response);

forward({
  from: pollOperations.doneData,
  to: fetchStatistics,
});

export {fetchStatistics};
