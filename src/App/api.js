import {ENDPOINTS} from './endpoints';

export const createOperation = async (instanceId, operationType) => {
  return await fetch(`/api/workflow-instances/${instanceId}/operation`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({operationType}),
  }).then(response => response.json());
};

export const createBatchOperation = async ({operationType, query}) => {
  console.log(JSON.stringify({operationType, query}));
  return await fetch(ENDPOINTS.createBatchOperation, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({operationType, query}),
  }).then(response => response.json());
};

export const fetchOperations = async () => {
  return await fetch(ENDPOINTS.operations, {method: 'POST'}).then(response => response.json());
};

export const fetchWorkflowInstances = async searchParams => {
  const url = `${ENDPOINTS.instances}?${searchParams}`;
  return await fetch(url, {method: 'POST'}).then(response => response.json());
};

export const fetchStatistics = async () => {
  return await fetch(ENDPOINTS.statistics).then(response => response.json());
};

export const fetchWorkflows = async () => {
  return await fetch(ENDPOINTS.workflows).then(response => response.json());
};
