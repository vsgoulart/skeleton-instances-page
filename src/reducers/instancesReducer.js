export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_WORKFLOW_INSTANCES_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POLL_WORKFLOW_INSTANCES_BEGIN': {
      return {
        ...state,
        isPolling: true,
      };
    }
    case 'POLL_WORKFLOW_INSTANCES_END': {
      return {
        ...state,
        isPolling: false,
      };
    }
    case 'GET_WORKFLOW_INSTANCES_FINISHED': {
      var activeInstances = action.payload.workflowInstances
        .filter(instance => instance.hasActiveOperation)
        .map(x => {
          return x.id;
        });

      return {
        ...state,
        active: activeInstances,
        instances: action.payload.workflowInstances,
        totalCount: action.payload.totalCount,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
