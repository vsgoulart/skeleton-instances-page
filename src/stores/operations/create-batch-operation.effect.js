import {createEffect} from 'effector';
import {ENDPOINTS} from '../endpoints';
import {operations$} from './stores';

const createBatchOperation = createEffect({
  async handler({ids, operationType}) {
    const response = await fetch(ENDPOINTS.createBatchOperation, {
      method: 'POST',
      body: JSON.stringify({operationType, query: {ids}}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());

    return response;
  },
});

operations$.on(createBatchOperation.doneData, (state, response) => [response, ...state]);

export {createBatchOperation};
