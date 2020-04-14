import {createEffect} from 'effector';
import {ENDPOINTS} from '../endpoints';
import {operations$} from './stores';

const createOperation = createEffect({
  async handler({id, operationType}) {
    const response = await fetch(ENDPOINTS.createOperation.replace(':instanceId', id), {
      method: 'POST',
      body: JSON.stringify({operationType}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());

    return response;
  },
});

operations$.on(createOperation.doneData, (state, response) => [response, ...state]);

export {createOperation};
