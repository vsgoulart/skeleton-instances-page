export const createOperation = operation => async dispatch => {
  const response = await fetch(`/api/workflow-instances/${operation.id}/operation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({operationType: operation.type}),
  });

  await response.json();
  dispatch({
    type: 'CREATE_OPERATION',
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

  var responseJson = await response.json();
  dispatch({
    type: 'CREATE_BATCH_OPREATION',
    payload: responseJson,
  });
};

export const getBatchOperations = () => async dispatch => {
  dispatch({
    type: 'GET_OPERATIONS_LOADING',
  });

  const response = await fetch('/api/batch-operations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({pageSize: 20}),
  });

  var responseJson = await response.json();
  dispatch({
    type: 'GET_OPERATIONS_FINISHED',
    payload: responseJson,
  });
};

export const pollBatchOperations = isPollingActive => async (dispatch, getState) => {
  if (!isPollingActive) {
    dispatch({
      type: 'POLL_BATCH_OPERATIONS_END',
    });

    return;
  }

  dispatch({
    type: 'POLL_BATCH_OPERATIONS_BEGIN',
  });

  var timerId = setInterval(async function () {
    if (!getState().operations.isPolling) {
      clearInterval(timerId);
      return;
    }
    dispatch({
      type: 'GET_OPERATIONS_LOADING',
    });
    const response = await fetch('/api/batch-operations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pageSize: 20}),
    });
    var responseJson = await response.json();
    dispatch({
      type: 'GET_OPERATIONS_FINISHED',
      payload: responseJson,
    });
  }, 5000);
};
