import throttle from 'lodash.throttle';

import {getStatistics} from './statistics';

const setInstancesAsActive = ids => async (dispatch, getState) => {
  dispatch({
    type: 'SET_INSTANCES_AS_ACTIVE',
    payload: {workflowInstances: getState().instances.instances, activeInstanceIds: ids},
  });
};

const getWorkflowInstances = () => async dispatch => {
  dispatch({
    type: 'GET_WORKFLOW_INSTANCES_LOADING',
  });

  const searchParams = new URLSearchParams(window.location.search);

  var filtersInQuerystring = {};
  for (var value of searchParams.entries()) {
    filtersInQuerystring[value[0]] = value[1];
  }

  const payload = await fetch('/api/workflow-instances', {
    method: 'POST',
    body: JSON.stringify(filtersInQuerystring),
  }).then(response => response.json());

  if (payload.workflowInstances.some(({hasActiveOperation}) => hasActiveOperation)) {
    dispatch(pollInstances);
  }

  dispatch(getStatistics());

  dispatch({
    type: 'GET_WORKFLOW_INSTANCES_FINISHED',
    payload,
  });
};

const pollInstances = throttle(dispatch => {
  setTimeout(() => {
    dispatch(getWorkflowInstances());
  }, 5000);
}, 5000);

export {setInstancesAsActive, getWorkflowInstances, pollInstances};
