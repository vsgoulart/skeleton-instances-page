import {createEffect, combine} from 'effector';
import {ENDPOINTS} from '../endpoints';
import {operations$} from './stores';

const fetchOperations = createEffect({
  async handler() {
    return await fetch(ENDPOINTS.operations, {method: 'POST'}).then(response => response.json());
  },
});

operations$.on(fetchOperations.doneData, (_, response) => response);

const isLoading$ = combine(fetchOperations.pending, isPending => isPending);

export {fetchOperations, isLoading$};
