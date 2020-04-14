import {createEffect, guard} from 'effector';
import throttle from 'lodash.throttle';
import {ENDPOINTS} from '../endpoints';
import {operations$} from './stores';

const throttledPollOperationsHandler = throttle(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(fetch(ENDPOINTS.operations, {method: 'POST'}).then(response => response.json()));
      }, 5000);
    }),
  5000,
);

const pollOperations = createEffect({
  handler: throttledPollOperationsHandler,
});

operations$.on(pollOperations.doneData, (_, response) => response);

guard({
  source: operations$,
  filter: operations => operations.some(operation => operation.endDate === null),
  target: pollOperations,
});

export {pollOperations};
