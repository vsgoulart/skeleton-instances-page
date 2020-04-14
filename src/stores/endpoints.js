const ENDPOINTS = Object.freeze({
  workflows: '/api/workflows/grouped',
  statistics: '/api/workflow-instances/core-statistics',
  operations: '/api/batch-operations',
  instances: '/api/workflow-instances',
  createOperation: '/api/workflow-instances/:instanceId/operation',
  createBatchOperation: '/api/workflow-instances/batch-operation',
});

module.exports = {ENDPOINTS};
