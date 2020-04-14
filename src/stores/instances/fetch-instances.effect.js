import {createEffect, combine} from 'effector';
import {ENDPOINTS} from '../endpoints';
import {instances$, totalCount$} from './stores';

const fetchInstances = createEffect({
  async handler() {
    return await fetch(ENDPOINTS.instances, {method: 'POST'}).then(response => response.json());
  },
});

instances$.on(fetchInstances.doneData, (_, response) => response.workflowInstances);
totalCount$.on(fetchInstances.doneData, (_, response) => response.totalCount);

const isLoading$ = combine(fetchInstances.pending, isPending => isPending);

export {fetchInstances, isLoading$};
