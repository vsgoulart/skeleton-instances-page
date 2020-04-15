export const setInstancesAsActive = ids => async (dispatch, getState) => {
  dispatch({
    type: 'SET_INSTANCES_AS_ACTIVE',
    payload: {workflowInstances: getState().instances.instances, activeInstanceIds: ids},
  });
};

export const getWorkflowInstances = () => async (dispatch, getState) => {
  dispatch({
    type: 'GET_WORKFLOW_INSTANCES_LOADING',
  });

  const searchParams = new URLSearchParams(window.location.search);

  var filtersInQuerystring = {};
  for (var value of searchParams.entries()) {
    filtersInQuerystring[value[0]] = value[1];
  }

  const response = await fetch('/api/workflow-instances', {
    method: 'POST',
    body: JSON.stringify(filtersInQuerystring),
  });

  var resposneJson = await response.json();
  dispatch({
    type: 'GET_WORKFLOW_INSTANCES_FINISHED',
    payload: resposneJson,
  });
};

export const pollWorkflowInstances = isPollingActive => async (dispatch, getState) => {
  if (!isPollingActive) {
    dispatch({
      type: 'POLL_WORKFLOW_INSTANCES_END',
    });

    return;
  }

  dispatch({
    type: 'POLL_WORKFLOW_INSTANCES_BEGIN',
  });

  const searchParams = new URLSearchParams(window.location.search);

  var filtersInQuerystring = {};
  for (var value of searchParams.entries()) {
    filtersInQuerystring[value[0]] = value[1];
  }

  var timerId = setInterval(async function () {
    if (!getState().instances.isPolling) {
      clearInterval(timerId);
      return;
    }
    dispatch({
      type: 'GET_WORKFLOW_INSTANCES_LOADING',
    });
    const response = await fetch('/api/workflow-instances', {
      method: 'POST',
      body: JSON.stringify(filtersInQuerystring),
    });

    var resposneJson = await response.json();
    dispatch({
      type: 'GET_WORKFLOW_INSTANCES_FINISHED',
      payload: resposneJson,
    });
  }, 5000);
};
