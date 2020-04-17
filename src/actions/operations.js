import throttle from 'lodash.throttle';

import {pollInstances} from './instances';

const createOperation = operation => async dispatch => {
  const payload = await fetch(`/api/workflow-instances/${operation.id}/operation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({operationType: operation.type}),
  }).then(response => response.json());

  dispatch({
    type: 'CREATE_OPERATION',
    payload,
  });

  dispatch(pollOperations);
  dispatch(pollInstances);
};

const createBatchOperation = operation => async dispatch => {
  const payload = await fetch('/api/workflow-instances/batch-operation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationType: operation.type,
      query: {
        running: true,
        finished: true,
        active: true,
        incidents: true,
        completed: true,
        canceled: true,
        ids: operation.ids,
        excludeIds: [],
      },
    }),
  }).then(response => response.json());

  dispatch({
    type: 'CREATE_BATCH_OPREATION',
    payload,
  });

  dispatch(pollOperations);
  dispatch(pollInstances);
};

const getOperations = () => async dispatch => {
  const payload = await fetch('/api/batch-operations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({pageSize: 20}),
  }).then(response => response.json());

  if (payload.some(operation => operation.endDate === null)) {
    dispatch(pollOperations);
  }

  dispatch({
    type: 'GET_OPERATIONS',
    payload,
  });
};

const pollOperations = throttle(
  dispatch => {
    setTimeout(() => {
      dispatch(getOperations());
    }, 5000);
  },
  5000,
  {trailing: false},
);

export {createOperation, createBatchOperation, getOperations, pollOperations};
