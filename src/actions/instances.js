import throttle from 'lodash.throttle';

import {getStatistics} from './statistics';

const setInstancesAsActive = ids => async dispatch => {
  dispatch({
    type: 'SET_INSTANCES_AS_ACTIVE',
    payload: ids,
  });
};

const getWorkflowInstances = () => async dispatch => {
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
    type: 'GET_WORKFLOW_INSTANCES',
    payload,
  });
};

const pollInstances = throttle(
  dispatch => {
    setTimeout(() => {
      dispatch(getWorkflowInstances());
    }, 5000);
  },
  5000,
  {trailing: false},
);

export {setInstancesAsActive, getWorkflowInstances, pollInstances};
