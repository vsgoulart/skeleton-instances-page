import {createEffect, forward, guard} from 'effector';
import throttle from 'lodash.throttle';
import {ENDPOINTS} from '../endpoints';
import {instances$, totalCount$} from './stores';
import {pollOperations} from '../operations';

const throttledPollInstacesHandler = throttle(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(fetch(ENDPOINTS.instances, {method: 'POST'}).then(response => response.json()));
      }, 5000);
    }),
  5000,
);
const pollInstances = createEffect({
  handler: throttledPollInstacesHandler,
});

instances$.on(pollInstances.doneData, (_, response) => response.workflowInstances);
totalCount$.on(pollInstances.doneData, (_, response) => response.totalCount);

forward({from: pollOperations.done, to: pollInstances});
guard({
  source: instances$,
  filter: instances => instances.some(instance => instance.hasActiveOperation),
  target: pollInstances,
});

export {pollInstances};
