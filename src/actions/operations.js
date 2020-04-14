export const cancelOperation = operation => async dispatch => {
  const response = await fetch(`/api/workflow-instances/${operation.id}/operation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({operationType: operation.type}),
  });

  var resposneJson = await response.json();
  dispatch({
    type: 'CANCEL_OPERATION',
    payload: resposneJson,
  });
};

export const retryOperation = operation => async dispatch => {
  const response = await fetch(`/api/workflow-instances/${operation.id}/operation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({operationType: operation.type}),
  });

  var resposneJson = await response.json();
  dispatch({
    type: 'RETRY_OPERATION',
    payload: resposneJson,
  });
};

export const createBatchOperation = operation => async dispatch => {
  const response = await fetch('/api/workflow-instances/batch-operation', {
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
  });

  var resposneJson = await response.json();
  dispatch({
    type: 'CREATE_BATCH_OPREATION',
    payload: resposneJson,
  });
};

export const getBatchOperations = () => async dispatch => {
  const response = await fetch('/api/batch-operations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({pageSize: 20}),
  });

  var resposneJson = await response.json();
  dispatch({
    type: 'GET_OPERATIONS',
    payload: resposneJson,
  });
};
