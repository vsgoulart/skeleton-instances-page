// import history from '../history';
//history.push('/')

export {getStatistics, pollStatistics} from './statistics';
export {getWorkflowInstances, pollWorkflowInstances} from './instances';
export {
  cancelOperation,
  retryOperation,
  createBatchOperation,
  getBatchOperations,
  pollBatchOperations,
} from './operations';
export {triggerPolling} from './polling';